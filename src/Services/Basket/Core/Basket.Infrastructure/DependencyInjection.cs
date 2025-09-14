#region using

using Basket.Application.Repositories;
using Basket.Infrastructure.Data.Extensions;
using Basket.Infrastructure.GrpcClients.Extensions;
using Basket.Infrastructure.Repositories;
using Common.Configurations;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MongoDB.Driver;
using StackExchange.Redis;

#endregion

namespace Basket.Infrastructure;

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

        services.Scan(s => s
            .FromAssemblyOf<InfrastructureMarker>()
            .AddClasses(c => c.Where(t => t.Name.EndsWith("Repository")))
            .UsingRegistrationStrategy(Scrutor.RegistrationStrategy.Skip)
            .AsImplementedInterfaces()
            .WithSingletonLifetime());

        services.Decorate<IBasketRepository, CachedBasketRepository>();

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

        services.AddStackExchangeRedisCache(options =>
        {
            options.ConfigurationOptions = new ConfigurationOptions
            {
                EndPoints = { cfg[$"{RedisCacheCfg.Section}:{RedisCacheCfg.EndPoint}"]! },
                Password = cfg[$"{RedisCacheCfg.Section}:{RedisCacheCfg.Password}"]!,
                AbortOnConnectFail = false,
                ConnectRetry = 3,
                ConnectTimeout = 5000,
                DefaultDatabase = 0
            };
            options.InstanceName = cfg[$"{RedisCacheCfg.Section}:{RedisCacheCfg.InstanceName}"]!;
        });

        services.AddGrpcClients(cfg);

        return services;
    }

    public static WebApplication UseInfrastructure(this WebApplication app)
    {
        app.EnsureIndexesAsync().GetAwaiter();

        return app;
    }

    #endregion
}
