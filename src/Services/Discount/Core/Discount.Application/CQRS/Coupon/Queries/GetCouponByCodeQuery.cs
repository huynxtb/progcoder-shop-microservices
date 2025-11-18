#region using

using Discount.Application.Dtos.Coupons;
using Discount.Application.Models.Results;
using Discount.Application.Repositories;

#endregion

namespace Discount.Application.CQRS.Coupon.Queries;

public sealed record GetCouponByCodeQuery(string Code) : IQuery<GetCouponResult>;

public sealed class GetCouponByCodeQueryValidator : AbstractValidator<GetCouponByCodeQuery>
{
    #region Ctors

    public GetCouponByCodeQueryValidator()
    {
        RuleFor(x => x.Code)
            .NotEmpty()
            .WithMessage(MessageCode.BadRequest);
    }

    #endregion
}

public sealed class GetCouponByCodeQueryHandler(ICouponRepository repository) : IQueryHandler<GetCouponByCodeQuery, GetCouponResult>
{
    #region Implementations

    public async Task<GetCouponResult> Handle(GetCouponByCodeQuery query, CancellationToken cancellationToken)
    {
        var coupon = await repository.GetByCodeAsync(query.Code, cancellationToken)
            ?? throw new NotFoundException(MessageCode.ResourceNotFound, query.Code);

        var dto = coupon.Adapt<CouponDto>();

        return new GetCouponResult(dto);
    }

    #endregion
}

