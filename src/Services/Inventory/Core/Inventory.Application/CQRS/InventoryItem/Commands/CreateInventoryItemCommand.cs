#region using

using Inventory.Application.Data;
using Inventory.Application.Dtos.InventoryItems;
using Inventory.Application.Services;
using Inventory.Domain.Entities;
using Common.Models.Reponses;
using BuildingBlocks.Abstractions.ValueObjects;

#endregion

namespace Inventory.Application.CQRS.InventoryItem.Commands;

public sealed record CreateInventoryItemCommand(CreateInventoryItemDto Dto, Actor Actor) : ICommand<Guid>;

public sealed class CreateInventoryItemCommandValidator : AbstractValidator<CreateInventoryItemCommand>
{
    #region Ctors

    public CreateInventoryItemCommandValidator()
    {
        RuleFor(x => x.Dto)
            .NotNull()
            .WithMessage(MessageCode.BadRequest)
            .DependentRules(() =>
            {
                RuleFor(x => x.Dto.ProductId)
                    .NotEmpty()
                    .WithMessage(MessageCode.ProductIdIsRequired);

                RuleFor(x => x.Dto.Quantity)
                    .NotEmpty()
                    .WithMessage(MessageCode.QuantityIsRequired)
                    .GreaterThan(0)
                    .WithMessage(MessageCode.QuantityCannotBeNegative);

                RuleFor(x => x.Dto.LocationId)
                    .NotEmpty()
                    .WithMessage(MessageCode.LocationIsRequired);
            });
    }

    #endregion
}

public sealed class CreateInventoryItemCommandHandler(
    IApplicationDbContext dbContext,
    ICatalogApiService catalogApi,
    ICatalogGrpcService catalogGrpc) : ICommandHandler<CreateInventoryItemCommand, Guid>
{
    #region Implementations

    public async Task<Guid> Handle(CreateInventoryItemCommand command, CancellationToken cancellationToken)
    {
        var dto = command.Dto;

        var productByApi = await catalogApi.GetProductByIdAsync(dto.ProductId.ToString())
            ?? throw new ClientValidationException(MessageCode.ProductIsNotExists, dto.ProductId);

        var productByGrpc = await catalogGrpc.GetProductByIdAsync(dto.ProductId.ToString(), cancellationToken)
            ?? throw new ClientValidationException(MessageCode.ProductIsNotExists, dto.ProductId);

        var inventoryItemId = Guid.NewGuid();

        await AddInventoryItemAsync(inventoryItemId,
            productByGrpc.Product.Id,
            productByGrpc.Product.Name!,
            dto.LocationId, 
            dto.Quantity, 
            command.Actor);
        await dbContext.SaveChangesAsync(cancellationToken);

        return inventoryItemId;
    }

    #endregion

    #region Methods

    private async Task AddInventoryItemAsync(
        Guid inventoryItemId, 
        Guid productId, 
        string productName, 
        Guid locationId, 
        int qty, 
        Actor actor)
    {
        var entity = InventoryItemEntity.Create(
            id: inventoryItemId,
            productId: productId,
            productName: productName,
            locationId: locationId,
            quantity: qty,
            performedBy: actor.ToString());

        await dbContext.InventoryItems.AddAsync(entity);
    }

    #endregion
}