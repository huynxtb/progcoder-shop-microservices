#region using

using BuildingBlocks.DistributedTracing;
using BuildingBlocks.Logging;
using BuildingBlocks.Swagger.Extensions;
using Catalog.Api.GrpcServices;
using Catalog.Api.GrpcServices.Interceptors;
using Common.Configurations;
using Common.Constants;
using HealthChecks.UI.Client;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using System.Xml.Linq;

#endregion

namespace Catalog.Api;

public static class DependencyInjection
{
    public static IServiceCollection AddApiServices(
        this IServiceCollection services, 
        IConfiguration cfg)
    {
        services.AddDistributedTracing(cfg);
        services.AddSerilogLogging(cfg);
        services.AddCarter();

        // HealthChecks
        {
            var dbype = cfg[$"{ConnectionStringsCfg.Section}:{ConnectionStringsCfg.DbType}"];
            var conn = cfg[$"{ConnectionStringsCfg.Section}:{ConnectionStringsCfg.Database}"];

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
                default:
                    throw new Exception("Unsupported database type");
            }
        }

        services.AddHttpContextAccessor();
        services.AddAuthenticationAndAuthorization(cfg);
        services.AddSwaggerServices(cfg);
        services
            .AddGrpc(o =>
            {
                o.Interceptors.Add<ApiKeyValidationInterceptor>();
            })
            .AddJsonTranscoding();
        services.AddSingleton<ApiKeyValidationInterceptor>();

        return services;
    }

    public static WebApplication UseApi(this WebApplication app)
    {
        app.UseSerilogReqLogging();
        app.UsePrometheusEndpoint();
        app.MapCarter();
        app.MapGrpcService<CatalogGrpc>();
        app.UseExceptionHandler(options => { });
        app.UseHealthChecks("/health",
            new HealthCheckOptions
            {
                ResponseWriter = UIResponseWriter.WriteHealthCheckUIResponse
            });

        app.UseAuthentication();
        app.UseAuthorization();
        app.UseSwaggerApi();

        return app;
    }


}
