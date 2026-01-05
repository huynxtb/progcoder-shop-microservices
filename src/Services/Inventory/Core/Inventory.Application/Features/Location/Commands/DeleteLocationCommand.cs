#region using

using Inventory.Application.Data;
using Inventory.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

#endregion

namespace Inventory.Application.Features.Location.Commands;

public sealed record DeleteLocationCommand(Guid LocationId) : ICommand<Unit>;

public sealed class DeleteLocationCommandValidator : AbstractValidator<DeleteLocationCommand>
{
    #region Ctors

    public DeleteLocationCommandValidator()
    {
        RuleFor(x => x.LocationId)
            .NotEmpty()
            .WithMessage(MessageCode.IdIsRequired);
    }

    #endregion
}

public sealed class DeleteLocationCommandHandler(IApplicationDbContext dbContext) 
    : ICommandHandler<DeleteLocationCommand, Unit>
{
    #region Implementations

    public async Task<Unit> Handle(DeleteLocationCommand command, CancellationToken cancellationToken)
    {
        var entity = await dbContext.Locations
            .SingleOrDefaultAsync(x => x.Id == command.LocationId, cancellationToken)
            ?? throw new NotFoundException(MessageCode.ResourceNotFound);

        // Check if location is being used by any inventory items
        var isInUse = await dbContext.InventoryItems
            .AnyAsync(x => x.LocationId == command.LocationId, cancellationToken);

        if (isInUse)
        {
            throw new ClientValidationException(MessageCode.BadRequest, command.LocationId);
        }

        dbContext.Locations.Remove(entity);
        await dbContext.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }

    #endregion
}

