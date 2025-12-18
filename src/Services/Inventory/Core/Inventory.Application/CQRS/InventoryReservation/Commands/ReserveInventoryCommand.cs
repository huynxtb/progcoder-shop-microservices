#region using

using Inventory.Application.Data;
using Inventory.Application.Dtos.InventoryReservations;
using Inventory.Domain.Entities;
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

        // Find inventory item with the highest available quantity for this product
        var inventoryItem = await dbContext.InventoryItems
            .Include(x => x.Location)
            .Where(x => x.Product.Id == dto.ProductId)
            .OrderByDescending(x => x.Available)
            .FirstOrDefaultAsync(cancellationToken)
            ?? throw new ClientValidationException(MessageCode.InventoryItemNotFound);

        // Check if enough stock available
        if (!inventoryItem.HasAvailable(dto.Quantity))
        {
            throw new ClientValidationException(MessageCode.InsufficientStock);
        }

        // Create reservation
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

        // Reserve the inventory (this will also raise domain event)
        inventoryItem.Reserve(dto.Quantity, reservationId, command.Actor.ToString());

        await dbContext.InventoryReservations.AddAsync(reservation, cancellationToken);
        dbContext.InventoryItems.Update(inventoryItem);
        await dbContext.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }

    #endregion
}

