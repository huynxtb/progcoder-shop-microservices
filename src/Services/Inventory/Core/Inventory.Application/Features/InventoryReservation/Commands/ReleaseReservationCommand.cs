#region using

using Inventory.Application.Data;
using Inventory.Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;

#endregion

namespace Inventory.Application.Features.InventoryReservation.Commands;

public sealed record ReleaseReservationCommand(
    Guid ReferenceId,
    string Reason,
    Actor Actor) : ICommand<Unit>;

public sealed class ReleaseReservationCommandValidator : AbstractValidator<ReleaseReservationCommand>
{
    #region Ctors

    public ReleaseReservationCommandValidator()
    {
        RuleFor(x => x.ReferenceId)
            .NotEmpty()
            .WithMessage(MessageCode.BadRequest);

        RuleFor(x => x.Reason)
            .NotEmpty()
            .WithMessage(MessageCode.BadRequest);
    }

    #endregion
}

public sealed class ReleaseReservationCommandHandler(IApplicationDbContext dbContext)
    : ICommandHandler<ReleaseReservationCommand, Unit>
{
    #region Implementations

    public async Task<Unit> Handle(ReleaseReservationCommand command, CancellationToken cancellationToken)
    {
        // Find all pending reservations for this reference (order)
        var reservations = await dbContext.InventoryReservations
            .Where(x => x.ReferenceId == command.ReferenceId && x.Status == ReservationStatus.Pending)
            .ToListAsync(cancellationToken);

        if (!reservations.Any())
        {
            // No pending reservations to release
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
                // Unreserve inventory directly in command handler
                inventoryItem.Unreserve(reservation.Quantity, reservation.Id, command.Actor.ToString());
                dbContext.InventoryItems.Update(inventoryItem);
            }

            // Release the reservation (this will raise ReservationReleasedDomainEvent)
            reservation.Release(command.Reason, command.Actor.ToString());
            dbContext.InventoryReservations.Update(reservation);
        }

        await dbContext.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }

    #endregion
}

