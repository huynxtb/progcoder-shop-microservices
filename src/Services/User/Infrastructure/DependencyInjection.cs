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
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Minio;
using Refit;
using SourceCommon.Configurations;

#endregion

namespace Infrastructure;

public static class DependencyInjection
{
    #region Methods

    public static IServiceCollection AddInfrastructureServices(
        this IServiceCollection services, 
        IConfiguration cfg)
    {
        services.AddDistributedTracingAndLogging(cfg);
        services.AddLogServer(cfg);

        services.AddMinio(configureClient => configureClient
                    .WithEndpoint(cfg[$"{MinIoCfg.Section}:{MinIoCfg.Endpoint}"])
                    .WithCredentials(cfg[$"{MinIoCfg.Section}:{MinIoCfg.AccessKey}"], cfg[$"{MinIoCfg.Section}:{MinIoCfg.SecretKey}"])
                    .WithSSL(cfg.GetValue<bool>(cfg[$"{MinIoCfg.Section}:{MinIoCfg.Secure}"]!))
                    .Build());

        services.AddScoped<IMinIOCloudService, MinIOCloudService>();

        // DbContext
        {
            var databaseType = cfg[$"{ConnectionStringsCfg.Section}:{ConnectionStringsCfg.DatabaseType}"];

            services.AddScoped<ISaveChangesInterceptor, AuditableEntityInterceptor>();
            services.AddScoped<ISaveChangesInterceptor, DispatchDomainEventsInterceptor>();

            services.AddDbContext<WriteDbContext>((sp, options) =>
            {
                var writeConn = cfg[$"{ConnectionStringsCfg.Section}:{ConnectionStringsCfg.WriteDb}"];

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
                var readConn = cfg[$"{ConnectionStringsCfg.Section}:{ConnectionStringsCfg.ReadDb}"];

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

            services.AddRefitClient<IKeycloakApi>()
            .ConfigureHttpClient(c =>
            {
                c.BaseAddress = new Uri(cfg[$"{KeycloakApiCfg.Section}:{KeycloakApiCfg.BaseUrl}"]!);
                c.Timeout = TimeSpan.FromSeconds(30);
            });
            //.AddPolicyHandler(retryPolicy)
            //.AddPolicyHandler(circuitBreakerPolicy);
        }

        services.AddScoped<IKeycloakService, KeycloakService>();

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
