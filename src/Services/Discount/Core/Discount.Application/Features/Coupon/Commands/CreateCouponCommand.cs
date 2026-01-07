#region using

using Discount.Application.Dtos.Coupons;
using Discount.Application.Repositories;
using Discount.Domain.Entities;

#endregion

namespace Discount.Application.Features.Coupon.Commands;

public sealed record CreateCouponCommand(CreateCouponDto Dto, Actor Actor) : ICommand<Guid>;

public sealed class CreateCouponCommandValidator : AbstractValidator<CreateCouponCommand>
{
    #region Ctors

    public CreateCouponCommandValidator()
    {
        RuleFor(x => x.Dto)
            .NotNull()
            .WithMessage(MessageCode.BadRequest)
            .DependentRules(() =>
            {
                RuleFor(x => x.Dto.Code)
                    .NotEmpty()
                    .WithMessage(MessageCode.CouponCodeIsRequired)
                    .MaximumLength(50)
                    .WithMessage(MessageCode.Max50Characters);

                RuleFor(x => x.Dto.Name)
                    .NotEmpty()
                    .WithMessage(MessageCode.ProgramNameIsRequired)
                    .MaximumLength(255)
                    .WithMessage(MessageCode.Max255Characters);

                RuleFor(x => x.Dto.Description)
                    .NotEmpty()
                    .WithMessage(MessageCode.DescriptionIsRequired)
                    .MaximumLength(500)
                    .WithMessage(MessageCode.Max500Characters);

                RuleFor(x => x.Dto.Value)
                    .GreaterThan(0)
                    .WithMessage(MessageCode.PriceIsRequired);

                RuleFor(x => x.Dto.MaxUsage)
                    .GreaterThan(0)
                    .WithMessage(MessageCode.MaxUsageIsRequired);

                When(x => x.Dto.MaxDiscountAmount.HasValue, () =>
                {
                    RuleFor(x => x.Dto.MaxDiscountAmount!.Value)
                        .GreaterThanOrEqualTo(0)
                        .WithMessage(MessageCode.MaxDiscountAmountCannotBeNegative);
                });

                RuleFor(x => x.Dto.ValidFrom)
                    .NotEmpty()
                    .WithMessage(MessageCode.ValidFromIsRequired);

                RuleFor(x => x.Dto.ValidTo)
                    .NotEmpty()
                    .WithMessage(MessageCode.ValidToIsRequired)
                    .GreaterThan(x => x.Dto.ValidFrom)
                    .WithMessage(MessageCode.ValidToInvalid);

                When(x => x.Dto.Type == Discount.Domain.Enums.CouponType.Percentage, () =>
                {
                    RuleFor(x => x.Dto.Value)
                        .LessThanOrEqualTo(100)
                        .WithMessage(MessageCode.OutOfRange);
                });
            });
    }

    #endregion
}

public sealed class CreateCouponCommandHandler(ICouponRepository repository) : ICommandHandler<CreateCouponCommand, Guid>
{
    #region Implementations

    public async Task<Guid> Handle(CreateCouponCommand command, CancellationToken cancellationToken)
    {
        var dto = command.Dto;

        var exists = await repository.ExistsByCodeAsync(dto.Code, cancellationToken);
        if (exists)
            throw new ClientValidationException(MessageCode.CouponCodeIsExists, dto.Code);

        var coupon = CouponEntity.Create(name: dto.Name,
            id: Guid.NewGuid(),
            code: dto.Code,
            description: dto.Description,
            type: dto.Type,
            value: dto.Value,
            maxUsage: dto.MaxUsage,
            maxDiscountAmount: dto.MaxDiscountAmount,
            minPurchaseAmount: dto.MinPurchaseAmount,
            validFrom: dto.ValidFrom,
            validTo: dto.ValidTo,
            performBy: command.Actor.ToString());

        await repository.CreateAsync(coupon, cancellationToken);

        return coupon.Id;
    }

    #endregion
}

