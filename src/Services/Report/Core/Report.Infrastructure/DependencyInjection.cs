#region using

using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MongoDB.Driver;
using Report.Infrastructure.Data.Extensions;

#endregion

namespace Report.Infrastructure;

public static class DependencyInjection
{
    #region Methods

    public static IServiceCollection AddInfrastructureServices(
        this IServiceCollection services,
        IConfiguration cfg)
    {
        services.Scan(s => s
            .FromAssemblyOf<InfrastructureMarker>()
            .AddClasses(c => c.Where(t => t.Name.EndsWith("NotificationSender")))
            .UsingRegistrationStrategy(Scrutor.RegistrationStrategy.Skip)
            .AsImplementedInterfaces()
            .WithTransientLifetime());

        services.Scan(s => s
            .FromAssemblyOf<InfrastructureMarker>()
            .AddClasses(c => c.Where(t => t.Name.EndsWith("Service")))
            .UsingRegistrationStrategy(Scrutor.RegistrationStrategy.Skip)
            .AsImplementedInterfaces()
            .WithScopedLifetime());

        services.Scan(s => s
            .FromAssemblyOf<InfrastructureMarker>()
            .AddClasses(c => c.Where(t => t.Name.EndsWith("Repository")))
            .UsingRegistrationStrategy(Scrutor.RegistrationStrategy.Skip)
            .AsImplementedInterfaces()
            .WithSingletonLifetime());

        // DbContext
        {
            var conn = cfg[$"{ConnectionStringsCfg.Section}:{ConnectionStringsCfg.Database}"];
            var dbName = cfg[$"{ConnectionStringsCfg.Section}:{ConnectionStringsCfg.DatabaseName}"];

            services.AddSingleton<IMongoClient>(sp =>
            {
                var settings = MongoClientSettings.FromConnectionString(conn);
                return new MongoClient(settings);
            });
            services.AddSingleton<IMongoDatabase>(sp =>
            {
                return sp.GetRequiredService<IMongoClient>().GetDatabase(dbName);
            });
        }

        return services;
    }

    public static WebApplication UseInfrastructure(this WebApplication app)
    {
        app.EnsureIndexesAsync().GetAwaiter();
        app.InitialiseDatabaseAsync().GetAwaiter();

        return app;
    }

    #endregion
}
