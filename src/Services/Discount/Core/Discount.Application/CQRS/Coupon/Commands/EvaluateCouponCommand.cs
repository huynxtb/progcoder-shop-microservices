#region using

using Discount.Application.Dtos.Coupons;
using Discount.Application.Models.Results;
using Discount.Application.Repositories;

#endregion

namespace Discount.Application.CQRS.Coupon.Commands;

public sealed record EvaluateCouponCommand(EvaluateCouponDto Dto) : ICommand<EvaluateCouponResult>;

public sealed class EvaluateCouponCommandValidator : AbstractValidator<EvaluateCouponCommand>
{
    #region Ctors

    public EvaluateCouponCommandValidator()
    {
        RuleFor(x => x.Dto)
            .NotNull()
            .WithMessage(MessageCode.BadRequest)
            .DependentRules(() =>
            {
                RuleFor(x => x.Dto.Code)
                    .NotEmpty()
                    .WithMessage(MessageCode.CouponCodeIsRequired);

                RuleFor(x => x.Dto.Amount)
                    .NotEmpty()
                    .WithMessage(MessageCode.PriceIsRequired);
            });
    }

    #endregion
}

public sealed class GetApplyCouponQueryHandler(ICouponRepository repository) : ICommandHandler<EvaluateCouponCommand, EvaluateCouponResult>
{
    #region Implementations

    public async Task<EvaluateCouponResult> Handle(EvaluateCouponCommand command, CancellationToken cancellationToken)
    {
        var dto = command.Dto;

        var coupon = await repository.GetByCodeAsync(dto.Code, cancellationToken)
            ?? throw new ClientValidationException(MessageCode.CouponCodeIsNotExistsOrExpired, dto.Code);

        if (!coupon.CanBeUsed())
            throw new ClientValidationException(MessageCode.CouponCodeIsNotExistsOrExpired, dto.Code);

        var discountAmount = coupon.CalculateDiscount(dto.Amount);

        return new EvaluateCouponResult(dto.Amount, discountAmount, dto.Code);
    }

    #endregion
}

