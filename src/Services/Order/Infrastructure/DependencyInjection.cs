#region using

using Order.Application.Data;
using Order.Application.Services;
using Order.Infrastructure.ApiClients;
using Order.Infrastructure.Data;
using Order.Infrastructure.Data.Extensions;
using Order.Infrastructure.Data.Interceptors;
using Order.Infrastructure.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Refit;
using Common.Configurations;
using Common.Constants;

#endregion

namespace Order.Infrastructure;

public static class DependencyInjection
{
    #region Methods

    public static IServiceCollection AddInfrastructureServices(
        this IServiceCollection services, 
        IConfiguration cfg)
    {
        services.Scan(s => s
            .FromAssemblyOf<InfrastructureMarker>()
            .AddClasses(c => c.Where(t => t.Name.EndsWith("Service")))
            .UsingRegistrationStrategy(Scrutor.RegistrationStrategy.Skip)
            .AsImplementedInterfaces()
            .WithScopedLifetime());

        // DbContext
        {
            var dbType = cfg[$"{ConnectionStringsCfg.Section}:{ConnectionStringsCfg.DbType}"];
            services.AddScoped<ISaveChangesInterceptor, AuditableEntityInterceptor>();
            services.AddScoped<ISaveChangesInterceptor, DispatchDomainEventsInterceptor>();
            services.AddDbContext<ApplicationDbContext>((sp, options) =>
            {
                var conn = cfg[$"{ConnectionStringsCfg.Section}:{ConnectionStringsCfg.Database}"];
                options.AddInterceptors(sp.GetServices<ISaveChangesInterceptor>());

                switch (dbType)
                {
                    case DatabaseType.SqlServer:
                        options.UseSqlServer(conn);
                        break;
                    case DatabaseType.MySql:
                        options.UseMySQL(conn!); 
                        break;
                    case DatabaseType.PostgreSql:
                        options.UseNpgsql(conn);
                        break;
                    default:
                        throw new Exception("Unsupported database type");
                }
            });

            services.AddScoped<IApplicationDbContext, ApplicationDbContext>();
        }

        // HttpClient
        {
            services.AddRefitClient<IKeycloakApi>()
                .ConfigureHttpClient(c =>
                {
                    c.BaseAddress = new Uri(cfg[$"{KeycloakApiCfg.Section}:{KeycloakApiCfg.BaseUrl}"]!);
                    c.Timeout = TimeSpan.FromSeconds(30);
                });

            services.AddRefitClient<ICatalogApi>()
                .ConfigureHttpClient(c =>
                {
                    c.BaseAddress = new Uri(cfg[$"{CatalogApiCfg.Section}:{CatalogApiCfg.BaseUrl}"]!);
                    c.Timeout = TimeSpan.FromSeconds(30);
                });
        }

        services.AddScoped<ICatalogApiService, CatalogApiService>();

        return services;
    }

    public static WebApplication UseInfrastructure(this WebApplication app)
    {
        app.InitialiseDatabaseAsync().Wait();

        return app;
    }

    #endregion
}
