#region using

using BuildingBlocks.DistributedTracing;
using BuildingBlocks.Logging;

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

        return services;
    }

    #endregion
}
