#region using

using Discount.Application.Dtos.Coupons;

#endregion

namespace Discount.Application.Models.Results;

public sealed class GetCouponByIdResult
{
    #region Fields, Properties and Indexers

    public CouponDto Coupon { get; init; }

    #endregion

    #region Ctors

    public GetCouponByIdResult(CouponDto coupon)
    {
        Coupon = coupon;
    }

    #endregion
}

