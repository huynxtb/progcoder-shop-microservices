#region using

using Catalog.Domain.Entities;
using Marten;
using SourceCommon.Models.Reponses;

#endregion

namespace Catalog.Application.CQRS.Product.Commands;

public record UnpublishProductCommand(Guid ProductId, Guid CurrentUserId) : ICommand<ResultSharedResponse<string>>;

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

public class UnpublishProductCommandHandler(IDocumentSession session) : ICommandHandler<UnpublishProductCommand, ResultSharedResponse<string>>
{
    #region Implementations

    public async Task<ResultSharedResponse<string>> Handle(UnpublishProductCommand command, CancellationToken cancellationToken)
    {
        var entity = await session.LoadAsync<ProductEntity>(command.ProductId)
            ?? throw new BadRequestException(MessageCode.ProductIsNotExists, command.ProductId);

        entity.Unpublish(command.CurrentUserId.ToString());
        session.Store(entity);

        await session.SaveChangesAsync(cancellationToken);

        return ResultSharedResponse<string>.Success(
            data: entity.Id.ToString(),
            message: MessageCode.UpdateSuccess);
    }

    #endregion

}