#region using

using Basket.Infrastructure.GrpcClients.Interceptors;
using Catalog.Grpc;
using Discount.Grpc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

#endregion

namespace Basket.Infrastructure.GrpcClients.Extensions;

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

        // Discount Grpc
        var discountServiceUrl = cfg.GetValue<string>($"{GrpcClientCfg.Discount.Section}:{GrpcClientCfg.Discount.Url}")
            ?? throw new InvalidOperationException("Discount service URL is not configured.");

        services.AddGrpcClient<DiscountGrpc.DiscountGrpcClient>(options =>
        {
            options.Address = new Uri(discountServiceUrl);
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
