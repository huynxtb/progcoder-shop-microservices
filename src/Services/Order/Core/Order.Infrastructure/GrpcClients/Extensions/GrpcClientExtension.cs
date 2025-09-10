#region using

using Catalog.Grpc;
using Common.Configurations;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

#endregion

namespace Order.Infrastructure.GrpcClients.Extensions;

public static class GrpcClientExtension
{
    #region Methods

    public static IServiceCollection AddGrpcClients(this IServiceCollection services, IConfiguration cfg)
    {
        var catalogServiceUrl = cfg.GetValue<string>($"{GrpcSettingsCfg.Catalog.Section}:{GrpcSettingsCfg.Catalog.Url}") 
            ?? throw new InvalidOperationException("Catalog service URL is not configured.");

        services.AddGrpcClient<CatalogGrpc.CatalogGrpcClient>(options =>
        {
            options.Address = new Uri(catalogServiceUrl);
        })
        .ConfigurePrimaryHttpMessageHandler(() =>
        {
            return new HttpClientHandler
            {
                ServerCertificateCustomValidationCallback = HttpClientHandler.DangerousAcceptAnyServerCertificateValidator
            };
        });

        return services;
    }

    #endregion
}
