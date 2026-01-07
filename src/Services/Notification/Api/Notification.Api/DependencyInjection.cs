#region using

using BuildingBlocks.Authentication.Extensions;
using BuildingBlocks.DistributedTracing;
using BuildingBlocks.Logging;
using BuildingBlocks.Swagger.Extensions;
using Common.Configurations;
using Common.Constants;
using Common.Models.Reponses;
using HealthChecks.UI.Client;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;

#endregion

namespace Notification.Api;

public static class DependencyInjection
{
    public static IServiceCollection AddApiServices(
        this IServiceCollection services,
        IConfiguration cfg)
    {
        services.AddDistributedTracing(cfg);
        services.AddSerilogLogging(cfg);
        services.AddCarter();

        var dbype = cfg[$"{ConnectionStringsCfg.Section}:{ConnectionStringsCfg.DbType}"];
        var conn = cfg[$"{ConnectionStringsCfg.Section}:{ConnectionStringsCfg.Database}"];
        var dbName = cfg[$"{ConnectionStringsCfg.Section}:{ConnectionStringsCfg.DatabaseName}"];

        switch (dbype)
        {
            case DatabaseType.SqlServer:
                services.AddHealthChecks()
                    .AddSqlServer(connectionString: conn!);
                break;
            case DatabaseType.MySql:
                services.AddHealthChecks()
                    .AddMySql(connectionString: conn!);
                break;
            case DatabaseType.PostgreSql:
                services.AddHealthChecks()
                    .AddNpgSql(connectionString: conn!);
                break;
            case DatabaseType.MongoDb:
                services.AddHealthChecks()
                    .AddMongoDb(
                        clientFactory: sp => new MongoDB.Driver.MongoClient(conn!),
                        databaseNameFactory: sp => dbName!);
                break;
            default:
                throw new Exception("Unsupported database type");
        }

        services.AddHttpContextAccessor();
        services.AddAuthenticationAndAuthorization(cfg);
        services.AddSwaggerServices(cfg);

        return services;
    }

    public static WebApplication UseApi(this WebApplication app)
    {
        app.UseSerilogReqLogging();
        app.UsePrometheusEndpoint();
        app.MapCarter();
        app.UseExceptionHandler(options => { });
        app.UseHealthChecks("/health",
            new HealthCheckOptions
            {
                ResponseWriter = UIResponseWriter.WriteHealthCheckUIResponse
            });

        app.UseAuthentication();
        app.UseAuthorization();
        app.UseSwaggerApi();

        app.MapGet("/", (IWebHostEnvironment env) => new ApiDefaultPathResponse
        {
            Service = "Notification.Api",
            Status = "Running",
            Timestamp = DateTimeOffset.UtcNow,
            Environment = env.EnvironmentName,
            Endpoints = new Dictionary<string, string>
            {
                { "health", "/health" }
            },
            Message = "API is running..."
        });

        return app;
    }
}
