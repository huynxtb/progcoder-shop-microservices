#region using

using BuildingBlocks.Behaviors;
using BuildingBlocks.Exceptions.Handler;
using EventSourcing.MassTransit;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.FeatureManagement;
using SourceCommon.Configurations;
using System.Reflection;

#endregion

namespace Application;

public static class DependencyInjection
{
    #region Methods

    public static IServiceCollection AddApplicationServices(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        services.Configure<AppConfigOptions>(
            configuration.GetSection(AppConfigOptions.Section));

        services.AddExceptionHandler<CustomExceptionHandler>();

        services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());

        services.AddMediatR(config =>
        {
            config.RegisterServicesFromAssembly(Assembly.GetExecutingAssembly());
            config.AddOpenBehavior(typeof(ValidationBehavior<,>));
            config.AddOpenBehavior(typeof(LoggingBehavior<,>));
        });

        services.AddFeatureManagement();
        services.AddMessageBroker(configuration, Assembly.GetExecutingAssembly());

        return services;
    }

    #endregion
}
