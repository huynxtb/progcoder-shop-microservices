#region using

using Discount.Application.Repositories;

#endregion

namespace Discount.Application.Features.Coupon.Commands;

public sealed record ApproveCouponCommand(Guid Id, Actor Actor) : ICommand<bool>;

public sealed class ApproveCouponCommandValidator : AbstractValidator<ApproveCouponCommand>
{
    #region Ctors

    public ApproveCouponCommandValidator()
    {
        RuleFor(x => x.Id)
            .NotEmpty()
            .WithMessage(MessageCode.IdIsRequired);
    }

    #endregion
}

public sealed class ApproveCouponCommandHandler(ICouponRepository repository) : ICommandHandler<ApproveCouponCommand, bool>
{
    #region Implementations

    public async Task<bool> Handle(ApproveCouponCommand command, CancellationToken cancellationToken)
    {
        var coupon = await repository.GetByIdAsync(command.Id, cancellationToken)
            ?? throw new NotFoundException(MessageCode.ResourceNotFound, command.Id);

        coupon.Approve(command.Actor.ToString());

        return await repository.UpdateAsync(coupon, cancellationToken);
    }

    #endregion
}

