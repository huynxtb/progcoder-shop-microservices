#region using

using MediatR;
using Inventory.Domain.Abstractions;

#endregion

namespace Inventory.Application.Features.InventoryItem.Commands;

public sealed record DeleteInventoryItemCommand(Guid InventoryItemId) : ICommand<Unit>;

public sealed class DeleteInventoryItemCommandValidator : AbstractValidator<DeleteInventoryItemCommand>
{
    #region Ctors

    public DeleteInventoryItemCommandValidator()
    {
        RuleFor(x => x.InventoryItemId)
            .NotEmpty()
            .WithMessage(MessageCode.InventoryItemIdIsRequired);
    }

    #endregion
}

public sealed class DeleteInventoryItemCommandHandler(IUnitOfWork unitOfWork)
    : ICommandHandler<DeleteInventoryItemCommand, Unit>
{
    #region Implementations

    public async Task<Unit> Handle(DeleteInventoryItemCommand command, CancellationToken cancellationToken)
    {
        var transaction = await unitOfWork.BeginTransactionAsync(cancellationToken);

        try
        {
            var entity = await unitOfWork.InventoryItems
            .FirstOrDefaultAsync(x => x.Id == command.InventoryItemId, cancellationToken)
            ?? throw new NotFoundException(MessageCode.ResourceNotFound);

            entity.Delete();
            unitOfWork.InventoryItems.Remove(entity);

            await unitOfWork.SaveChangesAsync(cancellationToken);
            await transaction.CommitAsync(cancellationToken);

            return Unit.Value;
        }
        catch (Exception)
        {
            await transaction.RollbackAsync(cancellationToken);
            throw;
        }
    }

    #endregion
}

