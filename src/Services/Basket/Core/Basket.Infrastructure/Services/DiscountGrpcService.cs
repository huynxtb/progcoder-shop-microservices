#region using

using Basket.Application.Services;
using Discount.Grpc;
using Microsoft.Extensions.Logging;

#endregion

namespace Basket.Infrastructure.Services;

public sealed class DiscountGrpcService(DiscountGrpc.DiscountGrpcClient grpcClient, ILogger<DiscountGrpcService> logger) : IDiscountGrpcService
{
    public async Task<Application.Models.Responses.Externals.EvaluateCouponResponse?> EvaluateCouponAsync(string code, decimal amount, CancellationToken cancellationToken = default)
    {
        try
        {
            var request = new EvaluateCouponRequest { Amount = (double)amount, Code = code };

            var result = await grpcClient.EvaluateCouponAsync(
                request,
                cancellationToken: cancellationToken);

            return new Application.Models.Responses.Externals.EvaluateCouponResponse()
            {
                CouponCode = result.CouponCode,
                DiscountAmount = (decimal)result.DiscountAmount,
                FinalAmount = (decimal)result.FinalAmount,
                OriginalAmount = (decimal)result.OriginalAmount
            };
        }
        catch (Exception ex)
        {
            logger.LogWarning(ex, "Failed to evaluate coupon {ProductId} from Discount Grpc service", code);
            return null;
        }
    }
}
