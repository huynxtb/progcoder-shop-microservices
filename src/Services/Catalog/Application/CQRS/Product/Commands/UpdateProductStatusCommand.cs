#region using

using Catalog.Domain.Entities;
using Catalog.Domain.Enums;
using Marten;
using SourceCommon.Models.Reponses;

#endregion

namespace Catalog.Application.CQRS.Product.Commands;

public record UpdateProductStatusCommand(Guid ProductId, ProductStatus Status, Guid CurrentUserId) : ICommand<ResultSharedResponse<string>>;

public class UpdateProductStatusCommandValidator : AbstractValidator<UpdateProductStatusCommand>
{
    #region Ctors

    public UpdateProductStatusCommandValidator()
    {
        RuleFor(x => x.ProductId)
            .NotEmpty()
            .WithMessage(MessageCode.ProductIdIsRequired);

        RuleFor(x => x.Status)
            .IsInEnum()
            .Must(status => Enum.IsDefined(typeof(ProductStatus), status))
            .WithMessage(MessageCode.StatusIsInvalid);
    }

    #endregion
}

public class UpdateProductStatusCommandHandler(IDocumentSession session) : ICommandHandler<UpdateProductStatusCommand, ResultSharedResponse<string>>
{
    #region Implementations

    public async Task<ResultSharedResponse<string>> Handle(UpdateProductStatusCommand command, CancellationToken cancellationToken)
    {
        var entity = await session.LoadAsync<ProductEntity>(command.ProductId)
            ?? throw new BadRequestException(MessageCode.ProductIsNotExists, command.ProductId);

        entity.ChangeStatus(command.Status, command.CurrentUserId.ToString());
        session.Store(entity);

        await session.SaveChangesAsync(cancellationToken);

        return ResultSharedResponse<string>.Success(
            data: entity.Id.ToString(),
            message: MessageCode.UpdateSuccess);
    }

    #endregion

}