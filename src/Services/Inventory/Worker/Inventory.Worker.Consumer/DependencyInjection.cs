#region using

using BuildingBlocks.Logging;
using EventSourcing.MassTransit;
using Inventory.Worker.Consumer.BackgroundServices;
using System.Reflection;

#endregion

namespace Inventory.Worker.Consumer;

public static class DependencyInjection
{
    #region Methods

    public static IServiceCollection AddWorkerServices(
        this IServiceCollection services,
        IConfiguration cfg)
    {
        services.AddSerilogLogging(cfg);
        services.AddMessageBroker(cfg, Assembly.GetExecutingAssembly());

        return services;
    }

    #endregion
}
