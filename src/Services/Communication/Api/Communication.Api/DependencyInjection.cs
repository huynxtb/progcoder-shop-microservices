#region using

using BuildingBlocks.Authentication.Extensions;
using BuildingBlocks.DistributedTracing;
using BuildingBlocks.Logging;
using Communication.Api.Constants;
using Communication.Api.Hubs;
using Communication.Api.Services;
using EventSourcing.MassTransit;
using HealthChecks.UI.Client;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using System.Reflection;

#endregion

namespace Communication.Api;

public static class DependencyInjection
{
    #region Methods

    public static IServiceCollection AddApiServices(
        this IServiceCollection services,
        IConfiguration cfg)
    {
        services.AddMessageBroker(cfg, Assembly.GetExecutingAssembly());
        services.AddDistributedTracing(cfg);
        services.AddSerilogLogging(cfg);
        services.AddHttpContextAccessor();
        services.AddAuthenticationAndAuthorization(cfg);
        services.AddSignalR();
        services.AddScoped<INotificationHubService, NotificationHubService>();

        return services;
    }

    public static WebApplication UseApi(this WebApplication app)
    {
        app.UseSerilogReqLogging();
        app.UsePrometheusEndpoint();
        app.UseExceptionHandler(options => { });
        app.UseHealthChecks("/health",
            new HealthCheckOptions
            {
                ResponseWriter = UIResponseWriter.WriteHealthCheckUIResponse
            });

        app.UseAuthentication();
        app.UseAuthorization();
        app.MapHub<NotificationHub>(ApiRoutes.Hub.NotificationHub);

        return app;
    }

    #endregion

}
