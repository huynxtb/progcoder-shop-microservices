                      #region using

using Discount.Application.Features.Coupon.Commands;
using Discount.Application.Dtos.Coupons;
using Grpc.Core;
using MediatR;

#endregion

namespace Discount.Grpc.Services;

public sealed class DiscountGrpcService(ISender sender) : DiscountGrpc.DiscountGrpcBase
{
    #region Methods

    public override async Task<ApplyCouponResponse> ApplyCoupon(ApplyCouponRequest request, ServerCallContext context)
    {
        var dto = new ApplyCouponDto()
        {
            Code = request.Code
        };

        var result = await sender.Send(new ApplyCouponCommand(dto));

        var response = new ApplyCouponResponse
        {
            CouponCode = result.CouponCode
        };

        return response;
    }

    public override async Task<EvaluateCouponResponse> EvaluateCoupon(EvaluateCouponRequest request, ServerCallContext context)
    {
        var dto = new EvaluateCouponDto()
        {
            Code = request.Code,
            Amount = (decimal)request.Amount
        };

        var result = await sender.Send(new EvaluateCouponCommand(dto));

        var response = new EvaluateCouponResponse
        {
            CouponCode = result.CouponCode,
            DiscountAmount = (double)result.DiscountAmount,
            FinalAmount = (double)result.FinalAmount,
            OriginalAmount = (double)result.OriginalAmount
        };

        return response;
    }

    #endregion
}
