#region using

using Inventory.Application.Data;
using Inventory.Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Reflection;

#endregion

namespace Inventory.Application.CQRS.InventoryReservation.Commands;

public sealed record ExpireReservationCommand(Actor Actor) : ICommand<Unit>;

public sealed class ExpireReservationCommandValidator : AbstractValidator<ExpireReservationCommand>
{
    #region Ctors

    public ExpireReservationCommandValidator()
    {

    }

    #endregion
}

public sealed class ExpireReservationCommandHandler(IApplicationDbContext dbContext, ILogger<ExpireReservationCommandHandler> logger)
    : ICommandHandler<ExpireReservationCommand, Unit>
{
    #region Implementations

    public async Task<Unit> Handle(ExpireReservationCommand command, CancellationToken cancellationToken)
    {
        var now = DateTimeOffset.UtcNow;
        var expiredReservations = await dbContext.InventoryReservations
            .Where(x => x.Status == ReservationStatus.Pending
                        && x.ExpiresAt.HasValue
                        && x.ExpiresAt.Value <= now)
            .ToListAsync(cancellationToken);

        if (!expiredReservations.Any())
        {
            logger.LogDebug("No expired reservations found at {Time}", now);
            return Unit.Value;
        }

        logger.LogInformation("Found {Count} expired reservations to process", expiredReservations.Count);

        foreach (var reservation in expiredReservations)
        {
            try
            {
                // Find the inventory item
                var inventoryItem = await dbContext.InventoryItems
                    .FirstOrDefaultAsync(x => x.Product.Id == reservation.Product.Id && x.LocationId == reservation.LocationId,
                        cancellationToken);

                if (inventoryItem == null)
                {
                    logger.LogWarning("Inventory item not found Product ID: {ProductId}, Location ID: {LocationId}", reservation.Product.Id, reservation.LocationId);
                    continue;
                }

                // Expire the reservation
                reservation.Expire();

                // Only unreserve if the reservation was actually expired (status changed)
                if (reservation.Status == Domain.Enums.ReservationStatus.Expired)
                {
                    inventoryItem.Unreserve((int)reservation.Quantity, reservation.Id, command.Actor.ToString());

                    dbContext.InventoryItems.Update(inventoryItem);
                    dbContext.InventoryReservations.Update(reservation);
                    await dbContext.SaveChangesAsync(cancellationToken);
                }

                logger.LogInformation("Successfully expired reservation {ReservationId} for order {OrderId}",
                    reservation.Id, reservation.ReferenceId);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Failed to expire reservation {ReservationId}", reservation.Id);
            }
        }

        

        return Unit.Value;
    }

    #endregion
}

