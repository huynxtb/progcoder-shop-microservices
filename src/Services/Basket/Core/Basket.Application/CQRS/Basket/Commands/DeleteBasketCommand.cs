#region using

using MediatR;
using Basket.Application.Repositories;

#endregion

namespace Basket.Application.CQRS.Basket.Commands;

public record DeleteBasketCommand(string UserId) : ICommand<Unit>;

public class DeleteProductCommandValidator : AbstractValidator<DeleteBasketCommand>
{
    #region Ctors

    public DeleteProductCommandValidator()
    {
        RuleFor(x => x.UserId)
            .NotEmpty()
            .WithMessage(MessageCode.UserIdIsRequired);
    }

    #endregion
}

public class DeleteProductCommandHandler(IBasketRepository repository) : ICommandHandler<DeleteBasketCommand, Unit>
{
    #region Implementations

    public async Task<Unit> Handle(DeleteBasketCommand command, CancellationToken cancellationToken)
    {
        await repository.DeleteBasketAsync(command.UserId, cancellationToken);

        return Unit.Value;
    }

    #endregion

}