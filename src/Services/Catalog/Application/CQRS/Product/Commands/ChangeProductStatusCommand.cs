#region using

using Catalog.Domain.Entities;
using Catalog.Domain.Enums;
using Marten;
using Common.Models.Reponses;
using BuildingBlocks.Abstractions.ValueObjects;

#endregion

namespace Catalog.Application.CQRS.Product.Commands;

public record ChangeProductStatusCommand(Guid ProductId, ProductStatus Status, Actor Actor) : ICommand<ResultSharedResponse<string>>;

public class ChangeProductStatusCommandValidator : AbstractValidator<ChangeProductStatusCommand>
{
    #region Ctors

    public ChangeProductStatusCommandValidator()
    {
        RuleFor(x => x.ProductId)
            .NotEmpty()
            .WithMessage(MessageCode.ProductIdIsRequired);

        RuleFor(x => x.Status)
            .Must(status => Enum.IsDefined(typeof(ProductStatus), status))
            .WithMessage(MessageCode.StatusIsRequired);
    }

    #endregion
}

public class ChangeProductStatusCommandHandler(IDocumentSession session) : ICommandHandler<ChangeProductStatusCommand, ResultSharedResponse<string>>
{
    #region Implementations

    public async Task<ResultSharedResponse<string>> Handle(ChangeProductStatusCommand command, CancellationToken cancellationToken)
    {
        var entity = await session.LoadAsync<ProductEntity>(command.ProductId)
            ?? throw new ClientValidationException(MessageCode.ProductIsNotExists, command.ProductId);

        entity.ChangeStatus(command.Status, command.Actor.ToString());
        session.Store(entity);

        await session.SaveChangesAsync(cancellationToken);

        return ResultSharedResponse<string>.Success(entity.Id.ToString(), MessageCode.UpdateSuccess);
    }

    #endregion
}