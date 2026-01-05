#region using

using AutoMapper;
using Discount.Application.Dtos.Coupons;
using Discount.Application.Models.Results;
using Discount.Application.Repositories;

#endregion

namespace Discount.Application.Features.Coupon.Queries;

public sealed record GetCouponByCodeQuery(string Code) : IQuery<GetCouponByIdResult>;

public sealed class GetCouponByCodeQueryValidator : AbstractValidator<GetCouponByCodeQuery>
{
    #region Ctors

    public GetCouponByCodeQueryValidator()
    {
        RuleFor(x => x.Code)
            .NotEmpty()
            .WithMessage(MessageCode.CouponCodeIsRequired);
    }

    #endregion
}

public sealed class GetCouponByCodeQueryHandler(ICouponRepository repository, IMapper mapper) : IQueryHandler<GetCouponByCodeQuery, GetCouponByIdResult>
{
    #region Implementations

    public async Task<GetCouponByIdResult> Handle(GetCouponByCodeQuery query, CancellationToken cancellationToken)
    {
        var coupon = await repository.GetByCodeAsync(query.Code, cancellationToken)
            ?? throw new NotFoundException(MessageCode.ResourceNotFound, query.Code);

        var dto = mapper.Map<CouponDto>(coupon);

        return new GetCouponByIdResult(dto);
    }

    #endregion
}

