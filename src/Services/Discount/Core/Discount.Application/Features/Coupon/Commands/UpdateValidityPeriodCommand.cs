#region using

using Discount.Application.Dtos.Coupons;
using Discount.Application.Repositories;

#endregion

namespace Discount.Application.Features.Coupon.Commands;

public sealed record UpdateValidityPeriodCommand(
    Guid Id,
    UpdateValidityPeriodDto Dto,
    Actor Actor) : ICommand<bool>;

public sealed class UpdateValidityPeriodCommandValidator : AbstractValidator<UpdateValidityPeriodCommand>
{
    #region Ctors

    public UpdateValidityPeriodCommandValidator()
    {
        RuleFor(x => x.Id)
            .NotEmpty()
            .WithMessage(MessageCode.IdIsRequired);

        RuleFor(x => x.Dto)
            .NotNull()
            .WithMessage(MessageCode.BadRequest)
            .DependentRules(() =>
            {
                RuleFor(x => x.Dto.ValidFrom)
                    .NotEmpty()
                    .WithMessage(MessageCode.ValidFromIsRequired);

                RuleFor(x => x.Dto.ValidTo)
                    .NotEmpty()
                    .WithMessage(MessageCode.ValidToIsRequired)
                    .GreaterThan(x => x.Dto.ValidFrom)
                    .WithMessage(MessageCode.ValidToInvalid);
            });
    }

    #endregion
}

public sealed class UpdateValidityPeriodCommandHandler(ICouponRepository repository) : ICommandHandler<UpdateValidityPeriodCommand, bool>
{
    #region Implementations

    public async Task<bool> Handle(UpdateValidityPeriodCommand command, CancellationToken cancellationToken)
    {
        var coupon = await repository.GetByIdAsync(command.Id, cancellationToken)
            ?? throw new NotFoundException(MessageCode.ResourceNotFound, command.Id);

        coupon.UpdateValidityPeriod(command.Dto.ValidFrom, command.Dto.ValidTo, command.Actor.ToString());

        return await repository.UpdateAsync(coupon, cancellationToken);
    }

    #endregion
}
