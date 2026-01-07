#region using

using Inventory.Domain.Abstractions;using Inventory.Domain.Repositories;
using Inventory.Application.Dtos.InventoryItems;
using Inventory.Application.Services;
using Inventory.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using BuildingBlocks.Abstractions.ValueObjects;
using Inventory.Domain.Enums;

#endregion

namespace Inventory.Application.Features.InventoryItem.Commands;

public sealed record UpdateInventoryItemCommand(
    Guid InventoryItemId,
    UpdateInventoryItemDto Dto,
    Actor Actor) : ICommand<Guid>;

public sealed class UpdateInventoryItemCommandValidator : AbstractValidator<UpdateInventoryItemCommand>
{
    #region Ctors

    public UpdateInventoryItemCommandValidator()
    {
        RuleFor(x => x.InventoryItemId)
            .NotEmpty()
            .WithMessage(MessageCode.InventoryItemIdIsRequired);

        RuleFor(x => x.Dto)
            .NotNull()
            .WithMessage(MessageCode.BadRequest)
            .DependentRules(() =>
            {
                RuleFor(x => x.Dto.ProductId)
                    .NotEmpty()
                    .WithMessage(MessageCode.ProductIdIsRequired);

                RuleFor(x => x.Dto.LocationId)
                    .NotEmpty()
                    .WithMessage(MessageCode.LocationIsRequired);
            });
    }

    #endregion
}

public sealed class UpdateInventoryItemCommandHandler(
    IUnitOfWork unitOfWork,
    ICatalogApiService catalogApi,
    ICatalogGrpcService catalogGrpc) : ICommandHandler<UpdateInventoryItemCommand, Guid>
{
    #region Implementations

    public async Task<Guid> Handle(UpdateInventoryItemCommand command, CancellationToken cancellationToken)
    {
        var transaction = await unitOfWork.BeginTransactionAsync(cancellationToken);

        try
        {
            var dto = command.Dto;
            var entity = await unitOfWork.InventoryItems
                .FirstOrDefaultAsync(x => x.Id == command.InventoryItemId, cancellationToken)
                ?? throw new NotFoundException(MessageCode.ResourceNotFound);
            var productByApi = await catalogApi.GetProductByIdAsync(dto.ProductId.ToString())
                ?? throw new ClientValidationException(MessageCode.ProductIsNotExists, dto.ProductId);
            var productByGrpc = await catalogGrpc.GetProductByIdAsync(dto.ProductId.ToString(), cancellationToken)
                ?? throw new ClientValidationException(MessageCode.ProductIsNotExists, dto.ProductId);
            var locations = await unitOfWork.Locations.GetAllAsync(cancellationToken);
            var requestLocation = locations.FirstOrDefault(x => x.Id == dto.LocationId)
                ?? throw new ClientValidationException(MessageCode.LocationIsNotExists, dto.LocationId);
            var currentLocation = locations.FirstOrDefault(x => x.Id == entity.LocationId);

            if (entity.IsLocationChanged(dto.LocationId))
            {
                var existsingInventoryItem = await unitOfWork.InventoryItems
                    .FirstOrDefaultAsync(x => x.Product.Id == productByGrpc.Product.Id && x.LocationId == dto.LocationId, cancellationToken);

                if (existsingInventoryItem is not null)
                {
                    entity.Increase(entity.Quantity, InventorySource.Merge.GetDescription(), command.Actor.ToString());
                    unitOfWork.InventoryItems.Remove(existsingInventoryItem);
                }
            }

            entity.Update(locationId: dto.LocationId,
                performedBy: command.Actor.ToString(),
                productId: productByGrpc.Product.Id,
                productName: productByGrpc.Product.Name!,
                oldLocationName: currentLocation?.Location,
                newLocationName: requestLocation.Location);

            unitOfWork.InventoryItems.Update(entity);
            
            await unitOfWork.SaveChangesAsync(cancellationToken);
            await transaction.CommitAsync(cancellationToken);

            return entity.Id;
        }
        catch (Exception)
        {
            await transaction.RollbackAsync(cancellationToken);
            throw;
        }
    }

    #endregion
}

