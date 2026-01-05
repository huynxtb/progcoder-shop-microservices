#region using

using Catalog.Domain.Abstractions;
using Catalog.Domain.Entities;
using Catalog.Domain.Events;
using Common.Models.Reponses;
using Marten;
using MediatR;

#endregion

namespace Catalog.Application.Features.Product.Commands;

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

public class DeleteProductCommandHandler(IDocumentSession session, IMediator mediator) : ICommandHandler<DeleteProductCommand, Unit>
{
    #region Implementations

    public async Task<Unit> Handle(DeleteProductCommand command, CancellationToken cancellationToken)
    {
        var product = await session.LoadAsync<ProductEntity>(command.ProductId) 
            ?? throw new ClientValidationException(MessageCode.ProductIsNotExists, command.ProductId.ToString());

        session.Delete<ProductEntity>(product.Id);

        var @event = new DeletedUnPublishedProductDomainEvent(product.Id);

        await mediator.Publish(@event, cancellationToken);
        await session.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }

    #endregion

}