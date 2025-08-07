#region using

using Application.Data;
using Application.Services;
using BuildingBlocks.LogServer;
using BuildingBlocks.TracingLogging;
using Infrastructure.ApiClients;
using Infrastructure.Data;
using Infrastructure.Data.Extensions;
using Infrastructure.Data.Interceptors;
using Infrastructure.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Minio;
using Polly;
using Polly.Extensions.Http;
using Refit;
using SourceCommon.Configurations;
using SourceCommon.Constants;
using SourceSourceCommon.Constants;

#endregion

namespace Infrastructure;

public static class DependencyInjection
{
    #region Methods

    public static IServiceCollection AddInfrastructureServices(
        this IServiceCollection services, 
        IConfiguration configuration)
    {
        services.AddDistributedTracingAndLogging(configuration);
        services.AddLogServer(configuration);

        services.Configure<MinIoOptions>(
            configuration.GetSection(MinIoOptions.Section));

        var minIoOpt = configuration
            .GetSection(MinIoOptions.Section)
            .Get<MinIoOptions>()
            ?? throw new InvalidOperationException("MinIoOptions section is missing or invalid.");

        services.AddMinio(configureClient => configureClient
                    .WithEndpoint(minIoOpt.Endpoint)
                    .WithCredentials(minIoOpt.AccessKey, minIoOpt.SecretKey)
                    .WithSSL(minIoOpt.Secure)
                    .Build());

        services.AddScoped<IMinIOCloudService, MinIOCloudService>();

        // DbContext
        {
            var connStrOpt = configuration
                .GetSection(ConnectionStringsOptions.Section)
                .Get<ConnectionStringsOptions>()
                ?? throw new InvalidOperationException("ConnectionStringsOptions section is missing or invalid.");

            services.AddScoped<ISaveChangesInterceptor, AuditableEntityInterceptor>();
            services.AddScoped<ISaveChangesInterceptor, DispatchDomainEventsInterceptor>();

            services.AddDbContext<WriteDbContext>((sp, options) =>
            {
                var databaseType = connStrOpt.DatabaseType;
                var writeConn = connStrOpt.WriteDb;

                options.AddInterceptors(sp.GetServices<ISaveChangesInterceptor>());

                switch (databaseType)
                {
                    case "SQLSERVER":
                        options.UseSqlServer(writeConn);
                        break;
                    case "MYSQL":
                        options.UseMySQL(writeConn!);
                        break;
                    case "POSTGRESQL":
                        options.UseNpgsql(writeConn);
                        break;
                    default:
                        throw new Exception("Unsupported database type");
                }
            });
            services.AddScoped<IWriteDbContext, WriteDbContext>();

            services.AddDbContext<ReadDbContext>((sp, options) =>
            {
                var databaseType = connStrOpt.DatabaseType;
                var readConn = connStrOpt.ReadDb;

                switch (databaseType)
                {
                    case "SQLSERVER":
                        options.UseSqlServer(readConn);
                        break;
                    case "MYSQL":
                        options.UseMySQL(readConn!);
                        break;
                    case "POSTGRESQL":
                        options.UseNpgsql(readConn);
                        break;
                    default:
                        throw new Exception("Unsupported database type");
                }
            });
            services.AddScoped<IReadDbContext, ReadDbContext>();
        }

        // HttpClient
        {
            //var retryPolicy = HttpPolicyExtensions
            //    .HandleTransientHttpError()
            //    .WaitAndRetryAsync(3, retryAttempt => TimeSpan.FromSeconds(Math.Pow(2, retryAttempt)));

            //var circuitBreakerPolicy = HttpPolicyExtensions
            //    .HandleTransientHttpError()
            //    .CircuitBreakerAsync(5, TimeSpan.FromSeconds(30));

            services.Configure<KeycloakApiOptions>(
                configuration.GetSection(KeycloakApiOptions.Section));

            var keycloakOpt = configuration
                .GetSection(KeycloakApiOptions.Section)
                .Get<KeycloakApiOptions>()
                ?? throw new InvalidOperationException("KeycloakApiOptions section is missing or invalid.");

            services.AddRefitClient<IKeycloakApi>()
            .ConfigureHttpClient(c =>
            {
                c.BaseAddress = new Uri(keycloakOpt.BaseUrl!);
                c.Timeout = TimeSpan.FromSeconds(10);
            });
            //.AddPolicyHandler(retryPolicy)
            //.AddPolicyHandler(circuitBreakerPolicy);
        }
        return services;
    }

    public static WebApplication UseInfrastructure(this WebApplication app)
    {
        app.UsePrometheusEndpoint();
        app.InitialiseDatabaseAsync().Wait();

        return app;
    }

    #endregion
}
