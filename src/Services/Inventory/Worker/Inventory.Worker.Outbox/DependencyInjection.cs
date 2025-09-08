#region using

using BuildingBlocks.Logging;
using EventSourcing.MassTransit;
using Inventory.Worker.Outbox.Processors;
using System.Reflection;

#endregion

namespace Inventory.Worker.Outbox;

public static class DependencyInjection
{
    #region Methods

    public static IServiceCollection AddWorkerServices(
        this IServiceCollection services,
        IConfiguration cfg)
    {
        services.AddSerilogLogging(cfg);
        services.AddMessageBroker(cfg, Assembly.GetExecutingAssembly());
        services.AddScoped<OutboxProcessor>();

        return services;
    }

    #endregion
}