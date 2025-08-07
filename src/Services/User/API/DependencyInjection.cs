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
        IConfiguration configuration)
    {
        services.AddCarter();

        services.Configure<ConnectionStringsOptions>(
            configuration.GetSection(ConnectionStringsOptions.Section));

        var connectionStrOpt = configuration
            .GetSection(ConnectionStringsOptions.Section)
            .Get<ConnectionStringsOptions>()
            ?? throw new InvalidOperationException("ConnectionStringsOptions section is missing or invalid.");

        var databaseType = connectionStrOpt.DatabaseType;
        var writeConn = connectionStrOpt.WriteDb;
        var readConn = connectionStrOpt.ReadDb;

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

        services.AddAuthorizationServerAuthentication(configuration);

        services.AddSwaggerServices(configuration);

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
