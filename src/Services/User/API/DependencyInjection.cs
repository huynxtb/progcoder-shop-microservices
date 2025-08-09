#region using

using BuildingBlocks.Swagger.Extensions;
using HealthChecks.UI.Client;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using SourceCommon.Configurations;

#endregion

namespace API;

public static class DependencyInjection
{
    public static IServiceCollection AddApiServices(
        this IServiceCollection services, 
        IConfiguration cfg)
    {
        services.AddCarter();

        var databaseType = cfg[$"{ConnectionStringsCfg.Section}:{ConnectionStringsCfg.DatabaseType}"];
        var writeConn = cfg[$"{ConnectionStringsCfg.Section}:{ConnectionStringsCfg.WriteDb}"];
        var readConn = cfg[$"{ConnectionStringsCfg.Section}:{ConnectionStringsCfg.ReadDb}"];

        switch (databaseType)
        {
            case "SQLSERVER":
                services.AddHealthChecks()
                    .AddSqlServer(connectionString: writeConn!, name: "wirte_db")
                    .AddSqlServer(connectionString: readConn!, name: "read_db");
                break;
            case "MYSQL":
                services.AddHealthChecks()
                    .AddMySql(connectionString: writeConn!, name: "wirte_db")
                    .AddMySql(connectionString: readConn!, name: "read_db");
                break;
            case "POSTGRESQL":
                services.AddHealthChecks()
                    .AddNpgSql(connectionString: writeConn!, name: "wirte_db")
                    .AddNpgSql(connectionString: readConn!, name: "read_db");
                break;
            //case "MONGO":
            //    services.AddHealthChecks()
            //        .AddMongoDb(connectionString: writeConn!, name: "wirte_db")
            //        .AddMongoDb(connectionString: readConn!, name: "read_db");
            //    break;
            default:
                throw new Exception("Unsupported database type");
        }

        services.AddHttpContextAccessor();

        services.AddAuthorizationServerAuthentication(cfg);

        services.AddSwaggerServices(cfg);

        return services;
    }

    public static WebApplication UseApi(this WebApplication app)
    {
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

        return app;
    }
}
