#region using

using Discount.Application.Repositories;

#endregion

namespace Discount.Application.CQRS.Coupon.Commands;

public sealed record RejectCouponCommand(Guid Id, Actor Actor) : ICommand<bool>;

public sealed class RejectCouponCommandValidator : AbstractValidator<RejectCouponCommand>
{
    #region Ctors

    public RejectCouponCommandValidator()
    {
        RuleFor(x => x.Id)
            .NotEmpty()
            .WithMessage(MessageCode.IdIsRequired);
    }

    #endregion
}

public sealed class RejectCouponCommandHandler(ICouponRepository repository) : ICommandHandler<RejectCouponCommand, bool>
{
    #region Implementations

    public async Task<bool> Handle(RejectCouponCommand command, CancellationToken cancellationToken)
    {
        var coupon = await repository.GetByIdAsync(command.Id, cancellationToken)
            ?? throw new NotFoundException(MessageCode.ResourceNotFound, command.Id);

        coupon.Reject(command.Actor.ToString());

        return await repository.UpdateAsync(coupon, cancellationToken);
    }

    #endregion
}

