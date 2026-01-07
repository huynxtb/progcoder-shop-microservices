#region using

using Inventory.Application.Dtos.InventoryReservations;
using Inventory.Domain.Entities;
using MediatR;
using Inventory.Domain.Abstractions;

#endregion

namespace Inventory.Application.Features.InventoryReservation.Commands;

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

public sealed class ReserveInventoryCommandHandler(IUnitOfWork unitOfWork)
    : ICommandHandler<ReserveInventoryCommand, Unit>
{
    #region Implementations

    public async Task<Unit> Handle(ReserveInventoryCommand command, CancellationToken cancellationToken)
    {
        var dto = command.Dto;
        var existingReservation = await unitOfWork.InventoryReservations
            .FirstOrDefaultAsync(x => x.ReferenceId == dto.ReferenceId, cancellationToken);

        if (existingReservation != null)
        {
            return Unit.Value;
        }

        var inventoryItems = await unitOfWork.InventoryItems
            .FindByProductWithRelationshipAsync(dto.ProductId, cancellationToken);
        var selectedItem = inventoryItems.FirstOrDefault()
            ?? throw new ClientValidationException(MessageCode.InventoryItemNotFound);

        if (!selectedItem.HasAvailable(dto.Quantity))
        {
            throw new ClientValidationException(MessageCode.InsufficientStock);
        }

        var reservationId = Guid.NewGuid();
        selectedItem.Reserve(dto.Quantity, reservationId, command.Actor.ToString());
        unitOfWork.InventoryItems.Update(selectedItem);

        var reservation = InventoryReservationEntity.Create(
            id: reservationId,
            productId: dto.ProductId,
            productName: dto.ProductName,
            referenceId: dto.ReferenceId,
            locationId: selectedItem.LocationId,
            quantity: dto.Quantity,
            expiresAt: dto.ExpiresAt,
            performedBy: command.Actor.ToString());

        await unitOfWork.InventoryReservations.AddAsync(reservation, cancellationToken);
        await unitOfWork.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }

    #endregion
}

