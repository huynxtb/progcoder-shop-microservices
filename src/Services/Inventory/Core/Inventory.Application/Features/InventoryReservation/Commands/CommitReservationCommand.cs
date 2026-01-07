#region using

using Inventory.Domain.Abstractions;using Inventory.Domain.Repositories;
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

public sealed class CommitReservationCommandHandler(IUnitOfWork unitOfWork)
    : ICommandHandler<CommitReservationCommand, Unit>
{
    #region Implementations

    public async Task<Unit> Handle(CommitReservationCommand command, CancellationToken cancellationToken)
    {
        var reservations = await unitOfWork.InventoryReservations
            .FindAsync(x => x.ReferenceId == command.ReferenceId && x.Status == ReservationStatus.Pending,
                cancellationToken);

        if (!reservations.Any()) return Unit.Value;

        foreach (var reservation in reservations)
        {
            var inventoryItem = await unitOfWork.InventoryItems
                .FirstOrDefaultAsync(x => 
                        x.Product.Id == reservation.Product.Id && 
                        x.LocationId == reservation.LocationId, 
                    cancellationToken);

            if (inventoryItem != null)
            {
                inventoryItem.CommitReservation(reservation.Quantity, command.Actor.ToString());
                unitOfWork.InventoryItems.Update(inventoryItem);
            }

            reservation.MarkCommitted(command.Actor.ToString());
            unitOfWork.InventoryReservations.Update(reservation);
        }

        await unitOfWork.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }

    #endregion
}

