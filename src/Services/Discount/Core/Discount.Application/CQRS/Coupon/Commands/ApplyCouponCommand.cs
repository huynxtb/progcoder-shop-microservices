#region using

using Discount.Application.Dtos.Coupons;
using Discount.Application.Models.Results;
using Discount.Application.Repositories;

#endregion

namespace Discount.Application.CQRS.Coupon.Commands;

public sealed record ApplyCouponCommand(ApplyCouponDto Dto) : ICommand<ApplyCouponResult>;

public sealed class ApplyCouponCommandValidator : AbstractValidator<ApplyCouponCommand>
{
    #region Ctors

    public ApplyCouponCommandValidator()
    {
        RuleFor(x => x.Dto)
            .NotNull()
            .WithMessage(MessageCode.BadRequest)
            .DependentRules(() =>
            {
                RuleFor(x => x.Dto.Code)
                    .NotEmpty()
                    .WithMessage(MessageCode.BadRequest);
            });
    }

    #endregion
}

public sealed class ApplyCouponCommandHandler(ICouponRepository repository) : ICommandHandler<ApplyCouponCommand, ApplyCouponResult>
{
    #region Implementations

    public async Task<ApplyCouponResult> Handle(ApplyCouponCommand command, CancellationToken cancellationToken)
    {
        var dto = command.Dto;

        var coupon = await repository.GetByCodeAsync(dto.Code, cancellationToken)
            ?? throw new ClientValidationException(MessageCode.CouponCodeIsNotExistsOrExpired, dto.Code);

        if (!coupon.CanBeUsed())
            throw new ClientValidationException(MessageCode.CouponCodeIsNotExistsOrExpired, dto.Code);

        coupon.Apply();

        return new ApplyCouponResult(dto.Code);
    }

    #endregion
}

