#region using

using MediatR;
using Basket.Application.Repositories;

#endregion

namespace Basket.Application.CQRS.Basket.Commands;

public record DeleteBasketCommand(string UserId) : ICommand<Unit>;

public class DeleteBasketCommandValidator : AbstractValidator<DeleteBasketCommand>
{
    #region Ctors

    public DeleteBasketCommandValidator()
    {
        RuleFor(x => x.UserId)
            .NotEmpty()
            .WithMessage(MessageCode.UserIdIsRequired);
    }

    #endregion
}

public class DeleteBasketCommandHandler(IBasketRepository repository) : ICommandHandler<DeleteBasketCommand, Unit>
{
    #region Implementations

    public async Task<Unit> Handle(DeleteBasketCommand command, CancellationToken cancellationToken)
    {
        await repository.DeleteBasketAsync(command.UserId, cancellationToken);

        return Unit.Value;
    }

    #endregion

}