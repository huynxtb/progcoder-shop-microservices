#region using

using BuildingBlocks.Behaviors;
using BuildingBlocks.Exceptions.Handler;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.FeatureManagement;
using System.Reflection;

#endregion

namespace Report.Application;

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
        services.AddAutoMapper(Assembly.GetExecutingAssembly());

        return services;
    }

    #endregion
}
