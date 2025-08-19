#region using

using BuildingBlocks.LogServer;
using BuildingBlocks.TracingLogging;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MongoDB.Driver;
using Notification.Application.Data.Repositories;
using Notification.Application.Services;
using Notification.Domain.Entities;
using Notification.Infrastructure.Data.Extensions;
using Notification.Infrastructure.Data.Repositories;
using Notification.Infrastructure.Services;
using SourceCommon.Configurations;
using SourceCommon.Extensions;

#endregion

namespace Notification.Infrastructure;

public static class DependencyInjection
{
    #region Methods

    public static IServiceCollection AddInfrastructureServices(
        this IServiceCollection services, 
        IConfiguration cfg)
    {
        services.AddDistributedTracingAndLogging(cfg);
        services.AddLogServer(cfg);

        // DbContext
        {
            var conn = cfg[$"{ConnectionStringsCfg.Section}:{ConnectionStringsCfg.Database}"];
            var dbName = cfg[$"{ConnectionStringsCfg.Section}:{ConnectionStringsCfg.DatabaseName}"];

            services.AddSingleton<IMongoClient>(_ => new MongoClient(conn));
            services.AddSingleton(sp => 
                sp.GetRequiredService<IMongoClient>().GetDatabase(dbName));
            services.AddSingleton(sp => 
                sp.GetRequiredService<IMongoDatabase>().GetCollection<AppNotification>("app_notifications"));
            services.AddSingleton(sp =>
                sp.GetRequiredService<IMongoDatabase>().GetCollection<NotificationDelivery>("notification_deliveries"));
            services.AddSingleton(sp =>
                sp.GetRequiredService<IMongoDatabase>().GetCollection<NotificationTemplate>("notification_templates"));
        }

        var strategies = AppDomain.CurrentDomain.GetAssemblies()
            .SelectMany(assembly => assembly.GetTypes())
            .Where(type => 
                typeof(INotificationChannel).IsAssignableFrom(type) && 
                !type.IsInterface && !type.IsAbstract);

        foreach (var strategy in strategies)
        {
            services.AddSingleton(
                typeof(INotificationChannel),
                strategy);
        }

        services.AddSingleton<ITemplateRenderer, TemplateRenderer>();
        services.AddSingleton<INotificationChannelResolver, NotificationChannelResolver>();
        services.AddSingleton<INotificationDeliveryRepository, NotificationDeliveryRepository>();
        services.AddSingleton<INotificationTemplateRepository, NotificationTemplateRepository>();

        return services;
    }

    public static WebApplication UseInfrastructure(this WebApplication app)
    {
        app.UsePrometheusEndpoint();
        app.EnsureIndexesAsync().GetAwaiter();
        app.InitialiseDatabaseAsync().GetAwaiter();

        return app;
    }

    #endregion
}
