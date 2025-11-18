#region using

using Discount.Application.Dtos.Coupons;
using Discount.Application.Repositories;

#endregion

namespace Discount.Application.CQRS.Coupon.Commands;

public sealed record UpdateCouponCommand(Guid Id, UpdateCouponDto Dto) : ICommand<bool>;

public sealed class UpdateCouponCommandValidator : AbstractValidator<UpdateCouponCommand>
{
    #region Ctors

    public UpdateCouponCommandValidator()
    {
        RuleFor(x => x.Id)
            .NotEmpty()
            .WithMessage(MessageCode.IdIsRequired);

        RuleFor(x => x.Dto)
            .NotNull()
            .WithMessage(MessageCode.BadRequest)
            .DependentRules(() =>
            {
                When(x => !string.IsNullOrWhiteSpace(x.Dto.Description), () =>
                {
                    RuleFor(x => x.Dto.Description)
                        .MaximumLength(500)
                        .WithMessage(MessageCode.Max500Characters);
                });

                When(x => x.Dto.Value.HasValue, () =>
                {
                    RuleFor(x => x.Dto.Value!.Value)
                        .GreaterThan(0)
                        .WithMessage(MessageCode.PriceIsRequired);
                });

                When(x => x.Dto.MaxUses.HasValue, () =>
                {
                    RuleFor(x => x.Dto.MaxUses!.Value)
                        .GreaterThan(0)
                        .WithMessage(MessageCode.QuantityIsRequired);
                });

                When(x => x.Dto.MaxDiscountAmount.HasValue, () =>
                {
                    RuleFor(x => x.Dto.MaxDiscountAmount!.Value)
                        .GreaterThanOrEqualTo(0)
                        .WithMessage(MessageCode.MoneyCannotBeNegative);
                });

                When(x => x.Dto.ValidFrom.HasValue && x.Dto.ValidTo.HasValue, () =>
                {
                    RuleFor(x => x.Dto.ValidTo!.Value)
                        .GreaterThan(x => x.Dto.ValidFrom!.Value)
                        .WithMessage(MessageCode.BadRequest);
                });
            });
    }

    #endregion
}

public sealed class UpdateCouponCommandHandler(ICouponRepository repository) : ICommandHandler<UpdateCouponCommand, bool>
{
    #region Implementations

    public async Task<bool> Handle(UpdateCouponCommand command, CancellationToken cancellationToken)
    {
        var coupon = await repository.GetByIdAsync(command.Id, cancellationToken)
            ?? throw new NotFoundException(MessageCode.ResourceNotFound, command.Id);

        var dto = command.Dto;

        if (!string.IsNullOrWhiteSpace(dto.Description))
            coupon.UpdateDescription(dto.Description);

        if (dto.Value.HasValue)
            coupon.UpdateValue(dto.Value.Value);

        if (dto.MaxUses.HasValue)
            coupon.UpdateMaxUses(dto.MaxUses.Value);

        // Update MaxDiscountAmount if a value is provided
        // Note: To clear MaxDiscountAmount, you would need to send a special value or use a separate endpoint
        // For now, we only update when a non-null value is provided
        if (dto.MaxDiscountAmount.HasValue)
            coupon.UpdateMaxDiscountAmount(dto.MaxDiscountAmount.Value);

        if (dto.ValidFrom.HasValue && dto.ValidTo.HasValue)
            coupon.UpdateValidityPeriod(dto.ValidFrom.Value, dto.ValidTo.Value);

        return await repository.UpdateAsync(coupon, cancellationToken);
    }

    #endregion
}

