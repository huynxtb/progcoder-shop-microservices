#region using

using Inventory.Domain.Abstractions;using Inventory.Domain.Repositories;
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

public sealed class ExpireReservationCommandHandler(IUnitOfWork unitOfWork, ILogger<ExpireReservationCommandHandler> logger)
    : ICommandHandler<ExpireReservationCommand, Unit>
{
    #region Implementations

    public async Task<Unit> Handle(ExpireReservationCommand command, CancellationToken cancellationToken)
    {
        var now = DateTimeOffset.UtcNow;
        var expiredReservations = await unitOfWork.InventoryReservations
            .FindAsync(x => x.Status == ReservationStatus.Pending
                        && x.ExpiresAt.HasValue
                        && x.ExpiresAt.Value <= now,
                cancellationToken);

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
                var inventoryItem = await unitOfWork.InventoryItems
                    .FirstOrDefaultAsync(x => 
                            x.Product.Id == reservation.Product.Id && 
                            x.LocationId == reservation.LocationId,
                        cancellationToken);

                if (inventoryItem != null)
                {
                    inventoryItem.Unreserve(reservation.Quantity, reservation.Id, Actor.System(AppConstants.Service.Inventory).ToString());
                    unitOfWork.InventoryItems.Update(inventoryItem);
                }

                reservation.Expire();

                if (reservation.Status == Domain.Enums.ReservationStatus.Expired)
                {
                    unitOfWork.InventoryReservations.Update(reservation);
                }

                logger.LogInformation("Successfully expired reservation {ReservationId} for order {OrderId}",
                    reservation.Id, reservation.ReferenceId);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Failed to expire reservation {ReservationId}", reservation.Id);
            }
        }

        await unitOfWork.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }

    #endregion
}

