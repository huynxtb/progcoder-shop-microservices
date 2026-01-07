#region using

using AutoMapper;
using Discount.Application.Dtos.Coupons;
using Discount.Application.Models.Results;
using Discount.Application.Repositories;

#endregion

namespace Discount.Application.Features.Coupon.Queries;

public sealed record GetCouponByIdQuery(Guid Id) : IQuery<GetCouponByIdResult>;

public sealed class GetCouponQueryHandler(ICouponRepository repository, IMapper mapper) : IQueryHandler<GetCouponByIdQuery, GetCouponByIdResult>
{
    #region Implementations

    public async Task<GetCouponByIdResult> Handle(GetCouponByIdQuery query, CancellationToken cancellationToken)
    {
        var coupon = await repository.GetByIdAsync(query.Id, cancellationToken)
            ?? throw new NotFoundException(MessageCode.ResourceNotFound, query.Id);

        var dto = mapper.Map<CouponDto>(coupon);

        return new GetCouponByIdResult(dto);
    }

    #endregion
}

