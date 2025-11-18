#region using

using Discount.Application.Dtos.Coupons;

#endregion

namespace Discount.Application.Models.Results;

public sealed class GetCouponsResult
{
    #region Fields, Properties and Indexers

    public IEnumerable<CouponDto> Coupons { get; init; } = Enumerable.Empty<CouponDto>();

    public int TotalCount { get; init; }

    #endregion

    #region Ctors

    public GetCouponsResult(IEnumerable<CouponDto> coupons, int totalCount)
    {
        Coupons = coupons;
        TotalCount = totalCount;
    }

    #endregion
}

