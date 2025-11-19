#region using

using BuildingBlocks.DistributedTracing;
using BuildingBlocks.Logging;
using Discount.Grpc.Interceptors;

#endregion

namespace Discount.Grpc;

public static class DependencyInjection
{
    #region Methods

    public static IServiceCollection AddGrpcServices(
       this IServiceCollection services,
       IConfiguration cfg)
    {
        services.AddDistributedTracing(cfg);
        services.AddSerilogLogging(cfg);
        services
            .AddGrpc(o =>
            {
                o.Interceptors.Add<ApiKeyValidationInterceptor>();
            })
            .AddJsonTranscoding();

        return services;
    }

    #endregion
}
