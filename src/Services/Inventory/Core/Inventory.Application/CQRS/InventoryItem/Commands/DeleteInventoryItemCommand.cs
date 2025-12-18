#region using

using Inventory.Application.Data;
using Inventory.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

#endregion

namespace Inventory.Application.CQRS.InventoryItem.Commands;

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

public sealed class DeleteInventoryItemCommandHandler(IApplicationDbContext dbContext) 
    : ICommandHandler<DeleteInventoryItemCommand, Unit>
{
    #region Implementations

    public async Task<Unit> Handle(DeleteInventoryItemCommand command, CancellationToken cancellationToken)
    {
        var entity = await dbContext.InventoryItems
            .SingleOrDefaultAsync(x => x.Id == command.InventoryItemId, cancellationToken)
            ?? throw new NotFoundException(MessageCode.ResourceNotFound);

        entity.Delete();

        dbContext.InventoryItems.Remove(entity);
        await dbContext.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }

    #endregion
}

