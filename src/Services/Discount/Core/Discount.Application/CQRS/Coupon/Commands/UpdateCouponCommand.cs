#region using

using Discount.Application.Dtos.Coupons;
using Discount.Application.Repositories;

#endregion

namespace Discount.Application.CQRS.Coupon.Commands;

public sealed record UpdateCouponCommand(Guid Id, UpdateCouponDto Dto, Actor Actor) : ICommand<bool>;

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
                RuleFor(x => x.Dto.Description)
                    .NotEmpty()
                    .WithMessage(MessageCode.DescriptionIsRequired)
                    .MaximumLength(500)
                    .WithMessage(MessageCode.Max500Characters);

                RuleFor(x => x.Dto.Name)
                    .NotEmpty()
                    .WithMessage(MessageCode.ProgramNameIsRequired)
                    .MaximumLength(255)
                    .WithMessage(MessageCode.Max255Characters);

                RuleFor(x => x.Dto.Value)
                    .GreaterThan(0)
                    .WithMessage(MessageCode.ValueIsRequired);

                RuleFor(x => x.Dto.MaxUsage)
                    .GreaterThan(0)
                    .WithMessage(MessageCode.MaxUsageIsRequired);

                When(x => x.Dto.MaxDiscountAmount.HasValue, () =>
                {
                    RuleFor(x => x.Dto.MaxDiscountAmount!.Value)
                        .GreaterThanOrEqualTo(0)
                        .WithMessage(MessageCode.MaxDiscountAmountCannotBeNegative);
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

        coupon.Update(description: dto.Description,
            name: dto.Name,
            type: dto.Type,
            value: dto.Value,
            maxUsage: dto.MaxUsage,
            maxDiscountAmount: dto.MaxDiscountAmount,
            minPurchaseAmount: dto.MinPurchaseAmount,
            performBy: command.Actor.ToString());

        return await repository.UpdateAsync(coupon, cancellationToken);
    }

    #endregion
}

