#region using

using MassTransit;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Common.Configurations;
using System.Reflection;

#endregion

namespace EventSourcing.MassTransit;

public static class Extentions
{
    #region Methods

    public static IServiceCollection AddMessageBroker(
        this IServiceCollection services,
        IConfiguration cfg,
        Assembly? assembly = null)
    {
        services.AddMassTransit(config =>
        {
            config.SetKebabCaseEndpointNameFormatter();

            if (assembly != null)
                config.AddConsumers(assembly);

            config.UsingRabbitMq((context, configurator) =>
            {
                configurator.Host(new Uri(cfg[$"{MessageBrokerCfg.Section}:{MessageBrokerCfg.Host}"]!), host =>
                {
                    host.Username(cfg[$"{MessageBrokerCfg.Section}:{MessageBrokerCfg.UserName}"]!);
                    host.Password(cfg[$"{MessageBrokerCfg.Section}:{MessageBrokerCfg.Password}"]!);
                });
                configurator.ConfigureEndpoints(context);
            });
        });

        return services;
    }

    #endregion
}
