#region using

using Discount.Infrastructure.Data.Extensions;
using Common.Configurations;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MongoDB.Driver;

#endregion

namespace Discount.Infrastructure;

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

        // Register repositories as scoped (required for Unit of Work pattern)
        services.Scan(s => s
            .FromAssemblyOf<InfrastructureMarker>()
            .AddClasses(c => c.Where(t => t.Name.EndsWith("Repository")))
            .UsingRegistrationStrategy(Scrutor.RegistrationStrategy.Skip)
            .AsImplementedInterfaces()
            .WithScopedLifetime());

        // Register UnitOfWork as scoped (must be after repositories)
        services.AddScoped<Discount.Application.Repositories.IUnitOfWork, Repositories.UnitOfWork>();

        // Register session provider (UnitOfWork implements it)
        services.AddScoped<Repositories.IMongoSessionProvider>(sp =>
            (Repositories.IMongoSessionProvider)sp.GetRequiredService<Discount.Application.Repositories.IUnitOfWork>());

        return services;
    }

    public static WebApplication UseInfrastructure(this WebApplication app)
    {
        app.EnsureIndexesAsync().GetAwaiter();

        return app;
    }

    #endregion
}
