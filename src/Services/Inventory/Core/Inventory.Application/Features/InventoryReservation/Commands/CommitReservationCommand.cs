#region using

using Inventory.Application.Data;
using Inventory.Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;

#endregion

namespace Inventory.Application.Features.InventoryReservation.Commands;

public sealed record CommitReservationCommand(
    Guid ReferenceId,
    Actor Actor) : ICommand<Unit>;

public sealed class CommitReservationCommandValidator : AbstractValidator<CommitReservationCommand>
{
    #region Ctors

    public CommitReservationCommandValidator()
    {
        RuleFor(x => x.ReferenceId)
            .NotEmpty()
            .WithMessage(MessageCode.BadRequest);
    }

    #endregion
}

public sealed class CommitReservationCommandHandler(IApplicationDbContext dbContext)
    : ICommandHandler<CommitReservationCommand, Unit>
{
    #region Implementations

    public async Task<Unit> Handle(CommitReservationCommand command, CancellationToken cancellationToken)
    {
        // Find all pending reservations for this reference (order)
        var reservations = await dbContext.InventoryReservations
            .Where(x => x.ReferenceId == command.ReferenceId && x.Status == ReservationStatus.Pending)
            .ToListAsync(cancellationToken);

        if (!reservations.Any())
        {
            return Unit.Value;
        }

        foreach (var reservation in reservations)
        {
            // Find the inventory item for this reservation
            var inventoryItem = await dbContext.InventoryItems
                .FirstOrDefaultAsync(x => x.Product.Id == reservation.Product.Id && x.LocationId == reservation.LocationId,
                    cancellationToken);

            if (inventoryItem != null)
            {
                // Commit the reservation on inventory item directly in command handler
                inventoryItem.CommitReservation(reservation.Quantity, command.Actor.ToString());
                dbContext.InventoryItems.Update(inventoryItem);
            }

            // Mark reservation as committed (this will raise ReservationCommittedDomainEvent)
            reservation.MarkCommitted(command.Actor.ToString());
            dbContext.InventoryReservations.Update(reservation);
        }

        await dbContext.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }

    #endregion
}

