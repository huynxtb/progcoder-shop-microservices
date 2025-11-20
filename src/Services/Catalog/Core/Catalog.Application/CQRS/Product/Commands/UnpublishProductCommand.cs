#region using

using Catalog.Domain.Entities;
using Catalog.Domain.Events;
using Marten;
using MediatR;

#endregion

namespace Catalog.Application.CQRS.Product.Commands;

public record UnpublishProductCommand(Guid ProductId, Actor Actor) : ICommand<Guid>;

public class UnpublishProductCommandValidator : AbstractValidator<UnpublishProductCommand>
{
    #region Ctors

    public UnpublishProductCommandValidator()
    {
        RuleFor(x => x.ProductId)
            .NotEmpty()
            .WithMessage(MessageCode.ProductIdIsRequired);

        //RuleFor(x => x.Status)
        //    .IsInEnum()
        //    .Must(status => Enum.IsDefined(typeof(ProductStatus), status))
        //    .WithMessage(MessageCode.StatusIsInvalid);
    }

    #endregion
}

public class UnpublishProductCommandHandler(IDocumentSession session, IMediator mediator) : ICommandHandler<UnpublishProductCommand, Guid>
{
    #region Implementations

    public async Task<Guid> Handle(UnpublishProductCommand command, CancellationToken cancellationToken)
    {
        await session.BeginTransactionAsync(cancellationToken);

        var entity = await session.LoadAsync<ProductEntity>(command.ProductId)
            ?? throw new ClientValidationException(MessageCode.ProductIsNotExists, command.ProductId);

        entity.Unpublish(command.Actor.ToString());
        session.Store(entity);

        var @event = new DeletedUnPublishedProductDomainEvent(entity.Id);

        await mediator.Publish(@event, cancellationToken);
        await session.SaveChangesAsync(cancellationToken);

        return entity.Id;
    }

    #endregion

}