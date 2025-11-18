#region using

using Basket.Application.Services;
using Discount.Grpc;
using Microsoft.Extensions.Logging;
using static MongoDB.Driver.WriteConcern;

#endregion

namespace Basket.Infrastructure.Services;

public sealed class DiscountGrpcService(DiscountGrpc.DiscountGrpcClient grpcClient, ILogger<DiscountGrpcService> logger) : IDiscountGrpcService
{
    public async Task<Application.Models.Responses.Externals.ApplyCouponResponse?> ApplyCouponAsync(string code, decimal amount, CancellationToken cancellationToken = default)
    {
        try
        {
            var request = new ApplyCouponRequest { Amount = (double)amount, Code = code };

            var result = await grpcClient.ApplyCouponAsync(
                request,
                cancellationToken: cancellationToken);

            return new Application.Models.Responses.Externals.ApplyCouponResponse()
            {
                CouponCode = result.CouponCode,
                DiscountAmount = (decimal)result.DiscountAmount,
                FinalAmount = (decimal)result.FinalAmount,
                OriginalAmount = (decimal)result.OriginalAmount,
            };
        }
        catch (Exception ex)
        {
            logger.LogWarning(ex, "Failed to get coupon {ProductId} from Discount Grpc service", code);
            return null;
        }
    }
}
