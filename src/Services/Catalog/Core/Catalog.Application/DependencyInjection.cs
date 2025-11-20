#region using

using BuildingBlocks.Behaviors;
using BuildingBlocks.Exceptions.Handler;
using EventSourcing.MassTransit;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.FeatureManagement;
using Common.Configurations;
using System.Reflection;

#endregion

namespace Catalog.Application;

public static class DependencyInjection
{
    #region Methods

    public static IServiceCollection AddApplicationServices(this IServiceCollection services)
    {
        services.AddExceptionHandler<CustomExceptionHandler>();
        services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());
        services.AddMediatR(config =>
        {
            config.RegisterServicesFromAssembly(Assembly.GetExecutingAssembly());
            config.AddOpenBehavior(typeof(ValidationBehavior<,>));
            config.AddOpenBehavior(typeof(LoggingBehavior<,>));
        });
        services.AddFeatureManagement();
        
        // Register all AutoMapper profiles from the current assembly
        services.AddAutoMapper(Assembly.GetExecutingAssembly());

        return services;
    }

    #endregion
}
