#region using

using Discount.Application.Repositories;

#endregion

namespace Discount.Application.CQRS.Coupon.Commands;

public sealed record DeleteCouponCommand(Guid Id) : ICommand<bool>;

public sealed class DeleteCouponCommandValidator : AbstractValidator<DeleteCouponCommand>
{
    #region Ctors

    public DeleteCouponCommandValidator()
    {
        RuleFor(x => x.Id)
            .NotEmpty()
            .WithMessage(MessageCode.IdIsRequired);
    }

    #endregion
}

public sealed class DeleteCouponCommandHandler(ICouponRepository repository) : ICommandHandler<DeleteCouponCommand, bool>
{
    #region Implementations

    public async Task<bool> Handle(DeleteCouponCommand command, CancellationToken cancellationToken)
    {
        var exists = await repository.GetByIdAsync(command.Id, cancellationToken);
        if (exists is null)
            throw new NotFoundException(MessageCode.ResourceNotFound, command.Id);

        return await repository.DeleteAsync(command.Id, cancellationToken);
    }

    #endregion
}

