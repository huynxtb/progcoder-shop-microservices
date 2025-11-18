#region using

using Discount.Application.Dtos.Coupons;
using Discount.Application.Models.Results;
using Discount.Application.Repositories;
using Discount.Domain.Entities;
using Discount.Domain.Enums;

#endregion

namespace Discount.Application.CQRS.Coupon.Queries;

public sealed record GetCouponsQuery(
    CouponStatus? Status = null,
    CouponType? Type = null,
    bool? ValidOnly = null) : IQuery<GetCouponsResult>;

public sealed class GetCouponsQueryHandler(ICouponRepository repository) : IQueryHandler<GetCouponsQuery, GetCouponsResult>
{
    #region Implementations

    public async Task<GetCouponsResult> Handle(GetCouponsQuery query, CancellationToken cancellationToken)
    {
        IEnumerable<CouponEntity> coupons;

        if (query.ValidOnly == true)
        {
            coupons = await repository.GetValidCouponsAsync(cancellationToken);
        }
        else if (query.Status.HasValue)
        {
            coupons = await repository.GetByStatusAsync(query.Status.Value, cancellationToken);
        }
        else if (query.Type.HasValue)
        {
            coupons = await repository.GetByTypeAsync(query.Type.Value, cancellationToken);
        }
        else
        {
            coupons = await repository.GetAllAsync(cancellationToken);
        }

        var couponList = coupons.ToList();
        var dtos = couponList.Select(coupon =>
        {
            var dto = coupon.Adapt<CouponDto>();

            return dto;
        });

        return new GetCouponsResult(dtos, couponList.Count);
    }

    #endregion
}

