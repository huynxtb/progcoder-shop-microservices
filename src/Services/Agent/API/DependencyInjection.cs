#region using

using BuildingBlocks.SerilogServer;
using BuildingBlocks.Swagger.Extensions;
using BuildingBlocks.TracingLogging;
using SourceCommon.Constants;
using HealthChecks.UI.Client;
using Infrastructure.Data.Extensions;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;

#endregion

namespace API
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddApiServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddCarter();

            var databaseType = configuration[$"{DatabaseConfig.Section}:{DatabaseConfig.DatabaseType}"]!;
            var writeConn = configuration[$"{DatabaseConfig.Section}:{DatabaseConfig.WriteDb}"]!;
            var readConn = configuration[$"{DatabaseConfig.Section}:{DatabaseConfig.ReadDb}"]!;

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
}
