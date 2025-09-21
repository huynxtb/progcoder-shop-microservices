#region using

using BuildingBlocks.Logging;
using System.Reflection;
using EventSourcing.MassTransit;
using Basket.Worker.Outbox.Processors;

#endregion

namespace Basket.Worker.Outbox;

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