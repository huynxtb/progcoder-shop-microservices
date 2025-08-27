#region using

using Catalog.Domain.Entities;
using Marten;
using SourceCommon.Models.Reponses;

#endregion

namespace Catalog.Application.CQRS.Product.Commands;

public record DeleteProductCommand(Guid ProductId, Guid CurrentUserId) : ICommand<ResultSharedResponse<string>>;

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

public class DeleteProductCommandHandler(IDocumentSession session) : ICommandHandler<DeleteProductCommand, ResultSharedResponse<string>>
{
    #region Implementations

    public async Task<ResultSharedResponse<string>> Handle(DeleteProductCommand command, CancellationToken cancellationToken)
    {
        var product = await session.LoadAsync<ProductEntity>(command.ProductId) 
            ?? throw new BadRequestException(MessageCode.ProductIsNotExists, command.ProductId.ToString());

        session.Delete<ProductEntity>(command.ProductId);
        await session.SaveChangesAsync(cancellationToken);

        return ResultSharedResponse<string>.Success(
            data: product.Id.ToString(),
            message: MessageCode.DeleteSuccess);
    }

    #endregion

}