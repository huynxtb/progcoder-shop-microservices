#region using

using AutoMapper;
using Discount.Application.Dtos.Coupons;
using Discount.Application.Models.Results;
using Discount.Application.Repositories;

#endregion

namespace Discount.Application.Features.Coupon.Queries;

public sealed record GetAllCouponsQuery() : IQuery<GetCouponsResult>;

public sealed class GetAllCouponsQueryHandler(ICouponRepository repository, IMapper mapper) : IQueryHandler<GetAllCouponsQuery, GetCouponsResult>
{
    #region Implementations

    public async Task<GetCouponsResult> Handle(GetAllCouponsQuery query, CancellationToken cancellationToken)
    {
        var coupons = await repository.GetAllAsync(cancellationToken);
        var couponList = coupons.ToList();
        var dtos = mapper.Map<List<CouponDto>>(couponList);

        return new GetCouponsResult(dtos, couponList.Count);
    }

    #endregion
}
