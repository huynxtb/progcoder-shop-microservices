#region using

using Catalog.Grpc;
using Common.Configurations;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Report.Infrastructure.GrpcClients.Interceptors;

#endregion

namespace Report.Infrastructure.GrpcClients.Extensions;

public static class GrpcClientExtension
{
    #region Methods

    public static IServiceCollection AddGrpcClients(this IServiceCollection services, IConfiguration cfg)
    {
        // Catalog Grpc
        var catalogServiceUrl = cfg.GetValue<string>($"{GrpcClientCfg.Catalog.Section}:{GrpcClientCfg.Catalog.Url}") 
            ?? throw new InvalidOperationException("Catalog service URL is not configured.");

        services.AddGrpcClient<CatalogGrpc.CatalogGrpcClient>(options =>
        {
            options.Address = new Uri(catalogServiceUrl);
        })
        .AddInterceptor<GrpcApiKeyInterceptor>()
        .ConfigurePrimaryHttpMessageHandler(() =>
        {
            return new HttpClientHandler
            {
                ServerCertificateCustomValidationCallback = HttpClientHandler.DangerousAcceptAnyServerCertificateValidator
            };
        });

        services.AddSingleton<GrpcApiKeyInterceptor>();

        return services;
    }

    #endregion
}
