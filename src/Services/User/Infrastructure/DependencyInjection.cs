#region using

using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Minio;
using Refit;
using SourceCommon.Configurations;
using SourceCommon.Constants;
using User.Application.Data;
using User.Infrastructure.ApiClients;
using User.Infrastructure.Data;
using User.Infrastructure.Data.Collectors;
using User.Infrastructure.Data.Extensions;
using User.Infrastructure.Data.Interceptors;

#endregion

namespace User.Infrastructure;

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

        services.AddMinio(configureClient => configureClient
                    .WithEndpoint(cfg[$"{MinIoCfg.Section}:{MinIoCfg.Endpoint}"])
                    .WithCredentials(cfg[$"{MinIoCfg.Section}:{MinIoCfg.AccessKey}"], cfg[$"{MinIoCfg.Section}:{MinIoCfg.SecretKey}"])
                    .WithSSL(cfg.GetValue<bool>(cfg[$"{MinIoCfg.Section}:{MinIoCfg.Secure}"]!))
                    .Build());

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

        services.AddScoped<IDomainEventsCollector, DomainEventsCollector>();

        // HttpClient
        {
            services.AddRefitClient<IKeycloakApi>()
            .ConfigureHttpClient(c =>
            {
                c.BaseAddress = new Uri(cfg[$"{KeycloakApiCfg.Section}:{KeycloakApiCfg.BaseUrl}"]!);
                c.Timeout = TimeSpan.FromSeconds(30);
            });
        }

        return services;
    }

    public static WebApplication UseInfrastructure(this WebApplication app)
    {
        app.InitialiseDatabaseAsync().Wait();

        return app;
    }

    #endregion
}
