#region using

using AutoMapper;
using Discount.Application.Dtos.Coupons;
using Discount.Application.Models.Results;
using Discount.Application.Repositories;
using Discount.Domain.Enums;

#endregion

namespace Discount.Application.Features.Coupon.Queries;

public sealed record GetCouponsApprovedQuery() : IQuery<GetCouponsResult>;

public sealed class GetCouponsApprovedQueryHandler(ICouponRepository repository, IMapper mapper) : IQueryHandler<GetCouponsApprovedQuery, GetCouponsResult>
{
    #region Implementations

    public async Task<GetCouponsResult> Handle(GetCouponsApprovedQuery query, CancellationToken cancellationToken)
    {
        var coupons = await repository.GetByStatusAsync(CouponStatus.Approved, cancellationToken);
        var couponList = coupons.ToList();
        var dtos = mapper.Map<List<CouponDto>>(couponList);

        return new GetCouponsResult(dtos, couponList.Count);
    }

    #endregion
}
