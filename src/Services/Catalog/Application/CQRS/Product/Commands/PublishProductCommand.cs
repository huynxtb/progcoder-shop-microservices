#region using

using Catalog.Domain.Entities;
using Marten;
using SourceCommon.Models.Reponses;

#endregion

namespace Catalog.Application.CQRS.Product.Commands;

public record PublishProductCommand(Guid ProductId, Guid CurrentUserId) : ICommand<ResultSharedResponse<string>>;

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

public class PublishProductCommandHandler(IDocumentSession session) : ICommandHandler<PublishProductCommand, ResultSharedResponse<string>>
{
    #region Implementations

    public async Task<ResultSharedResponse<string>> Handle(PublishProductCommand command, CancellationToken cancellationToken)
    {
        var entity = await session.LoadAsync<ProductEntity>(command.ProductId)
            ?? throw new ClientValidationException(MessageCode.ProductIsNotExists, command.ProductId);

        entity.Publish(command.CurrentUserId.ToString());
        session.Store(entity);

        await session.SaveChangesAsync(cancellationToken);

        return ResultSharedResponse<string>.Success(
            data: entity.Id.ToString(),
            message: MessageCode.UpdateSuccess);
    }

    #endregion

}