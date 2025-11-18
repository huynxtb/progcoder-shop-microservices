#region using

using Discount.Application.Dtos.Coupons;
using Discount.Application.Models.Results;
using Discount.Application.Repositories;

#endregion

namespace Discount.Application.CQRS.Coupon.Queries;

public sealed record GetCouponQuery(Guid Id) : IQuery<GetCouponResult>;

public sealed class GetCouponQueryHandler(ICouponRepository repository) : IQueryHandler<GetCouponQuery, GetCouponResult>
{
    #region Implementations

    public async Task<GetCouponResult> Handle(GetCouponQuery query, CancellationToken cancellationToken)
    {
        var coupon = await repository.GetByIdAsync(query.Id, cancellationToken)
            ?? throw new NotFoundException(MessageCode.ResourceNotFound, query.Id);

        var dto = coupon.Adapt<CouponDto>();
        
        return new GetCouponResult(dto);
    }

    #endregion
}

