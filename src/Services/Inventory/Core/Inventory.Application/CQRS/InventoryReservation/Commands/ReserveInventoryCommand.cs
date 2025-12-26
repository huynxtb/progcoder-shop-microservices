#region using

using Inventory.Application.Data;
using Inventory.Application.Dtos.InventoryReservations;
using Inventory.Domain.Entities;
using Inventory.Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;

#endregion

namespace Inventory.Application.CQRS.InventoryReservation.Commands;

public sealed record ReserveInventoryCommand(
    CreateReservationDto Dto,
    Actor Actor) : ICommand<Unit>;

public sealed class ReserveInventoryCommandValidator : AbstractValidator<ReserveInventoryCommand>
{
    #region Ctors

    public ReserveInventoryCommandValidator()
    {
        RuleFor(x => x.Dto)
            .NotNull()
            .WithMessage(MessageCode.BadRequest)
            .DependentRules(() =>
            {
                RuleFor(x => x.Dto.ProductId)
                    .NotEmpty()
                    .WithMessage(MessageCode.ProductIdIsRequired);

                RuleFor(x => x.Dto.ProductName)
                    .NotEmpty()
                    .WithMessage(MessageCode.ProductNameIsRequired);

                RuleFor(x => x.Dto.ReferenceId)
                    .NotEmpty()
                    .WithMessage(MessageCode.BadRequest);

                RuleFor(x => x.Dto.Quantity)
                    .GreaterThan(0)
                    .WithMessage(MessageCode.QuantityCannotBeNegative);
            });
    }

    #endregion
}

public sealed class ReserveInventoryCommandHandler(IApplicationDbContext dbContext)
    : ICommandHandler<ReserveInventoryCommand, Unit>
{
    #region Implementations

    public async Task<Unit> Handle(ReserveInventoryCommand command, CancellationToken cancellationToken)
    {
        var dto = command.Dto;

        // Idempotency check: Check if reservation already exists for this ReferenceId + ProductId + Pending status
        var existingReservation = await dbContext.InventoryReservations
            .FirstOrDefaultAsync(
                x => x.ReferenceId == dto.ReferenceId 
                    && x.Product.Id == dto.ProductId 
                    && x.Status == ReservationStatus.Pending,
                cancellationToken);

        if (existingReservation != null)
        {
            // Reservation already exists, return early (idempotent behavior)
            return Unit.Value;
        }

        // Find inventory item with the highest available quantity for this product
        var inventoryItem = await dbContext.InventoryItems
            .Include(x => x.Location)
            .Where(x => x.Product.Id == dto.ProductId && x.Quantity > x.Reserved)
            .OrderByDescending(x => x.Quantity - x.Reserved)
            .FirstOrDefaultAsync(cancellationToken)
            ?? throw new ClientValidationException(MessageCode.InventoryItemNotFound);

        // Check if enough stock available
        if (!inventoryItem.HasAvailable(dto.Quantity))
        {
            throw new ClientValidationException(MessageCode.InsufficientStock);
        }

        // Create reservation (this will raise ReservationCreatedDomainEvent)
        var reservationId = Guid.NewGuid();
        var reservation = InventoryReservationEntity.Create(
            id: reservationId,
            productId: dto.ProductId,
            productName: dto.ProductName,
            referenceId: dto.ReferenceId,
            locationId: inventoryItem.Location.Id,
            quantity: dto.Quantity,
            expiresAt: dto.ExpiresAt,
            performedBy: command.Actor.ToString());

        await dbContext.InventoryReservations.AddAsync(reservation, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }

    #endregion
}

