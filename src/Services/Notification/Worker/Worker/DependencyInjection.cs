#region using

using BuildingBlocks.Behaviors;
using BuildingBlocks.Exceptions.Handler;
using EventSourcing.MassTransit;
using FluentValidation;
using Microsoft.FeatureManagement;
using SourceCommon.Configurations;
using System.Reflection;

#endregion

namespace Notification.Worker;

public static class DependencyInjection
{
    #region Methods

    public static IServiceCollection AddWorkerServices(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        services.AddMessageBroker(configuration, Assembly.GetExecutingAssembly());

        return services;
    }

    #endregion
}
