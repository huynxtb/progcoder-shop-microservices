#region using

using MassTransit;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using SourceCommon.Configurations;
using System.Reflection;

#endregion

namespace EventSourcing.MassTransit;

public static class Extentions
{
    #region Methods

    public static IServiceCollection AddMessageBroker(
        this IServiceCollection services, 
        IConfiguration configuration, 
        Assembly? assembly = null)
    {
        services.Configure<MessageBrokerOptions>(
            configuration.GetSection(MessageBrokerOptions.Section));

        var msgBrokerOpt = configuration
            .GetSection(MessageBrokerOptions.Section)
            .Get<MessageBrokerOptions>()
            ?? throw new InvalidOperationException("DistributedTracingLoggingOptions section is missing or invalid.");

        services.AddMassTransit(config =>
        {
            config.SetKebabCaseEndpointNameFormatter();

            if (assembly != null)
                config.AddConsumers(assembly);

            config.UsingRabbitMq((context, configurator) =>
            {
                configurator.Host(new Uri(msgBrokerOpt.Host!), host =>
                {
                    host.Username(msgBrokerOpt.UserName!);
                    host.Password(msgBrokerOpt.Password!);
                });
                configurator.ConfigureEndpoints(context);
            });
        });

        return services;
    }

    #endregion
}
