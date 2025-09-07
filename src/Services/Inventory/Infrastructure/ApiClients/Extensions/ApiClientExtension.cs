#region using

using Common.Configurations;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Refit;

#endregion

namespace Inventory.Infrastructure.ApiClients.Extensions;

public static class ApiClientExtension
{
    #region Methods

    public static IServiceCollection AddApiClients(this IServiceCollection services, IConfiguration cfg)
    {
        services.AddRefitClient<IKeycloakApi>()
                .ConfigureHttpClient(c =>
                {
                    c.BaseAddress = new Uri(cfg[$"{ApiClientCfg.Keycloak.Section}:{ApiClientCfg.Keycloak.BaseUrl}"]!);
                    c.Timeout = TimeSpan.FromSeconds(30);
                });

        services.AddRefitClient<ICatalogApi>()
            .ConfigureHttpClient(c =>
            {
                c.BaseAddress = new Uri(cfg[$"{ApiClientCfg.Catalog.Section}:{ApiClientCfg.Catalog.BaseUrl}"]!);
                c.Timeout = TimeSpan.FromSeconds(30);
            });

        return services;
    }

    #endregion
}
