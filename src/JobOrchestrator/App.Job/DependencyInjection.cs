#region using

using App.Job.ApiClients;
using App.Job.GrpcClients.Interceptors;
using App.Job.Quartz;
using BuildingBlocks.Logging;
using Catalog.Grpc;
using Common.Configurations;
using Order.Grpc;
using Quartz;
using Refit;
using Report.Grpc;

#endregion

namespace App.Job;

public static class DependencyInjection
{
    #region Methods

    public static IServiceCollection AddWorkerServices(
        this IServiceCollection services,
        IConfiguration cfg)
    {
        services.AddSerilogLogging(cfg);

        services.AddQuartz(q =>
        {
            q.UseInMemoryStore();
            q.UseDefaultThreadPool(tp =>
            {
                tp.MaxConcurrency = 10;
            });

            q.UseJobFactory<QuartzJobFactory>();
        });

        services.AddQuartzHostedService(q => q.WaitForJobsToComplete = true);
        services.AddQuartzJobs();
        services.AddRefitClients(cfg);
        services.AddGrpcClients(cfg);

        return services;
    }

    public static async Task RegisterJobsAsync(
        this IServiceProvider serviceProvider,
        CancellationToken cancellationToken = default)
    {
        var scheduler = await serviceProvider.GetRequiredService<ISchedulerFactory>().GetScheduler(cancellationToken);
        var loggerFactory = serviceProvider.GetRequiredService<ILoggerFactory>();
        var logger = loggerFactory.CreateLogger("App.Job");

        await scheduler.RegisterJobsToScheduler(logger, cancellationToken);
    }

    #endregion

    #region Private Methods

    private static IServiceCollection AddRefitClients(this IServiceCollection services, IConfiguration cfg)
    {
        services.AddRefitClient<IKeycloakApi>()
                .ConfigureHttpClient(c =>
                {
                    c.BaseAddress = new Uri(cfg[$"{KeycloakApiCfg.Section}:{KeycloakApiCfg.BaseUrl}"]!);
                    c.Timeout = TimeSpan.FromSeconds(30);
                });

        return services;
    }

    public static IServiceCollection AddGrpcClients(this IServiceCollection services, IConfiguration cfg)
    {
        // Catalog Grpc
        {
            var catalogServiceUrl = cfg.GetValue<string>($"{GrpcClientCfg.Catalog.Section}:{GrpcClientCfg.Catalog.Url}")
            ?? throw new InvalidOperationException("Catalog service URL is not configured.");

            services.AddGrpcClient<CatalogGrpc.CatalogGrpcClient>(options =>
            {
                options.Address = new Uri(catalogServiceUrl);
            })
            .AddInterceptor<GrpcApiKeyInterceptor>()
            .ConfigurePrimaryHttpMessageHandler(() =>
            {
                return new HttpClientHandler
                {
                    ServerCertificateCustomValidationCallback = HttpClientHandler.DangerousAcceptAnyServerCertificateValidator
                };
            });
        }

        // Order Grpc
        {
            var orderServiceUrl = cfg.GetValue<string>($"{GrpcClientCfg.Order.Section}:{GrpcClientCfg.Order.Url}")
            ?? throw new InvalidOperationException("Order service URL is not configured.");

            services.AddGrpcClient<OrderGrpc.OrderGrpcClient>(options =>
            {
                options.Address = new Uri(orderServiceUrl);
            })
            .AddInterceptor<GrpcApiKeyInterceptor>()
            .ConfigurePrimaryHttpMessageHandler(() =>
            {
                return new HttpClientHandler
                {
                    ServerCertificateCustomValidationCallback = HttpClientHandler.DangerousAcceptAnyServerCertificateValidator
                };
            });
        }

        // Report Grpc
        {
            var reportServiceUrl = cfg.GetValue<string>($"{GrpcClientCfg.Report.Section}:{GrpcClientCfg.Report.Url}")
            ?? throw new InvalidOperationException("Report service URL is not configured.");

            services.AddGrpcClient<ReportGrpc.ReportGrpcClient>(options =>
            {
                options.Address = new Uri(reportServiceUrl);
            })
            .AddInterceptor<GrpcApiKeyInterceptor>()
            .ConfigurePrimaryHttpMessageHandler(() =>
            {
                return new HttpClientHandler
                {
                    ServerCertificateCustomValidationCallback = HttpClientHandler.DangerousAcceptAnyServerCertificateValidator
                };
            });
        }

        services.AddSingleton<GrpcApiKeyInterceptor>();

        return services;
    }

    #endregion
}
