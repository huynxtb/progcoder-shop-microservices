#region using

using Basket.Domain.Entities;
using Marten;
using Common.Models.Reponses;
using MediatR;

#endregion

namespace Basket.Application.CQRS.Product.Commands;

public record DeleteProductCommand(Guid ProductId) : ICommand<Unit>;

public class DeleteProductCommandValidator : AbstractValidator<DeleteProductCommand>
{
    #region Ctors

    public DeleteProductCommandValidator()
    {
        RuleFor(x => x.ProductId)
            .NotEmpty()
            .WithMessage(MessageCode.ProductIdIsRequired);
    }

    #endregion
}

public class DeleteProductCommandHandler(IDocumentSession session) : ICommandHandler<DeleteProductCommand, Unit>
{
    #region Implementations

    public async Task<Unit> Handle(DeleteProductCommand command, CancellationToken cancellationToken)
    {
        var product = await session.LoadAsync<ProductEntity>(command.ProductId) 
            ?? throw new ClientValidationException(MessageCode.ProductIsNotExists, command.ProductId.ToString());

        session.Delete<ProductEntity>(command.ProductId);
        await session.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }

    #endregion

}