#region using

using Application.Data;
using Infrastructure.Data.Interceptors;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using Application.Services;
using Infrastructure.Services;
using Minio;
using BuildingBlocks.TracingLogging;
using BuildingBlocks.SerilogServer;
using Microsoft.AspNetCore.Builder;
using Infrastructure.Data.Extensions;
using SourceCommon.Constants;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;

#endregion

namespace Infrastructure;

public static class DependencyInjection
{
    #region Methods

    public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, 
        IConfiguration configuration)
    {
        services.AddDistributedTracingAndLogging(configuration);
        services.AddSerilogServer(configuration);

        services.AddMinio(configureClient => configureClient
                    .WithEndpoint(configuration[$"{MinIO.Section}:{MinIO.Endpoint}"])
                    .WithCredentials(configuration[$"{MinIO.Section}:{MinIO.AccessKey}"], configuration[$"{MinIO.Section}:{MinIO.SecretKey}"])
                    .WithSSL(bool.Parse(configuration[$"{MinIO.Section}:{MinIO.Secure}"]!))
                    .Build());

        services.AddScoped<IMinIOCloudService, MinIOCloudService>();

        // DbContext
        {
            services.AddScoped<ISaveChangesInterceptor, AuditableEntityInterceptor>();
            services.AddScoped<ISaveChangesInterceptor, DispatchDomainEventsInterceptor>();

            services.AddDbContext<WriteDbContext>((sp, options) =>
            {
                var databaseType = configuration[$"{DatabaseConfig.Section}:{DatabaseConfig.DatabaseType}"]!;
                var writeConn = configuration[$"{DatabaseConfig.Section}:{DatabaseConfig.WriteDb}"]!;

                options.AddInterceptors(sp.GetServices<ISaveChangesInterceptor>());

                switch (databaseType)
                {
                    case "SQLSERVER":
                        options.UseSqlServer(writeConn);
                        break;
                    case "MYSQL":
                        options.UseMySQL(writeConn);
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
                var databaseType = configuration[$"{DatabaseConfig.Section}:{DatabaseConfig.DatabaseType}"]!;
                var readConn = configuration[$"{DatabaseConfig.Section}:{DatabaseConfig.ReadDb}"]!;

                switch (databaseType)
                {
                    case "SQLSERVER":
                        options.UseSqlServer(readConn);
                        break;
                    case "MYSQL":
                        options.UseMySQL(readConn);
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
