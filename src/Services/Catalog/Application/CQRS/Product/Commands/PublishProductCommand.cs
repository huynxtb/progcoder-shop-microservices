#region using

using BuildingBlocks.Abstractions.ValueObjects;
using Catalog.Domain.Entities;
using Common.Models.Reponses;
using Marten;

#endregion

namespace Catalog.Application.CQRS.Product.Commands;

public record PublishProductCommand(Guid ProductId, Actor Actor) : ICommand<Guid>;

public class PublishProductCommandValidator : AbstractValidator<PublishProductCommand>
{
    #region Ctors

    public PublishProductCommandValidator()
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

public class PublishProductCommandHandler(IDocumentSession session) : ICommandHandler<PublishProductCommand, Guid>
{
    #region Implementations

    public async Task<Guid> Handle(PublishProductCommand command, CancellationToken cancellationToken)
    {
        var entity = await session.LoadAsync<ProductEntity>(command.ProductId)
            ?? throw new ClientValidationException(MessageCode.ProductIsNotExists, command.ProductId);

        entity.Publish(command.Actor.ToString());
        session.Store(entity);

        await session.SaveChangesAsync(cancellationToken);

        return entity.Id;
    }

    #endregion

}