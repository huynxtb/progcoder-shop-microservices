#region using

using Inventory.Application.Data;
using Inventory.Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

#endregion

namespace Inventory.Application.Features.InventoryReservation.Commands;

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
                // Find the inventory item for this reservation
                var inventoryItem = await dbContext.InventoryItems
                    .FirstOrDefaultAsync(x => x.Product.Id == reservation.Product.Id && x.LocationId == reservation.LocationId,
                        cancellationToken);

                if (inventoryItem != null)
                {
                    // Unreserve inventory directly in command handler
                    inventoryItem.Unreserve(reservation.Quantity, reservation.Id, Actor.System(AppConstants.Service.Inventory).ToString());
                    dbContext.InventoryItems.Update(inventoryItem);
                }

                // Expire the reservation (this will raise ReservationExpiredDomainEvent if status changes)
                reservation.Expire();

                // Only update if the reservation was actually expired (status changed)
                if (reservation.Status == Domain.Enums.ReservationStatus.Expired)
                {
                    dbContext.InventoryReservations.Update(reservation);
                }

                logger.LogInformation("Successfully expired reservation {ReservationId} for order {OrderId}",
                    reservation.Id, reservation.ReferenceId);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Failed to expire reservation {ReservationId}", reservation.Id);
            }
        }

        await dbContext.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }

    #endregion
}

