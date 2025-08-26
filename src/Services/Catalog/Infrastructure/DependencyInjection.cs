#region using

using Marten;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Minio;
using SourceCommon.Configurations;

#endregion

namespace Catalog.Infrastructure;

public static class DependencyInjection
{
    #region Methods

    public static IServiceCollection AddInfrastructureServices(
        this IServiceCollection services, 
        IConfiguration cfg)
    {
        services.AddMarten(opts =>
        {
            opts.Connection(cfg[$"{ConnectionStringsCfg.Section}:{ConnectionStringsCfg.Database}"]!);
        }).UseLightweightSessions();

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

        services.InitializeMartenWith<InitialCategoryData>();

        return services;
    }

    public static WebApplication UseInfrastructure(this WebApplication app)
    {
        return app;
    }

    #endregion
}
