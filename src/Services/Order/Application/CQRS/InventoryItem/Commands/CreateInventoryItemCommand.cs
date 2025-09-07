#region using

using EventSourcing.Events.Inventories;
using Order.Application.Data;
using Order.Application.Dtos.InventoryItems;
using Order.Application.Services;
using Order.Domain.Entities;
using Order.Domain.Enums;
using Common.Models.Reponses;
using Newtonsoft.Json;
using BuildingBlocks.Abstractions.ValueObjects;

#endregion

namespace Order.Application.CQRS.InventoryItem.Commands;

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

                RuleFor(x => x.Dto.Location)
                    .NotEmpty()
                    .WithMessage(MessageCode.LocationIsRequired);
            });
    }

    #endregion
}

public sealed class CreateInventoryItemCommandHandler(
    IApplicationDbContext dbContext,
    ICatalogApiService catalogApi) : ICommandHandler<CreateInventoryItemCommand, Guid>
{
    #region Implementations

    public async Task<Guid> Handle(CreateInventoryItemCommand command, CancellationToken cancellationToken)
    {
        var dto = command.Dto;
        var product = await catalogApi.GetProductByIdAsync(dto.ProductId.ToString())
            ?? throw new ClientValidationException(MessageCode.ProductIsNotExists, dto.ProductId);
        var inventoryItemId = Guid.NewGuid();

        await AddInventoryItemAsync(inventoryItemId, 
            product.Data.Id, 
            product.Data.Name!, 
            dto.Location!, 
            dto.Quantity, 
            command.Actor);
        await dbContext.SaveChangesAsync(cancellationToken);

        return Guid.Success(
            data: inventoryItemId.ToString(),
            message: MessageCode.CreateSuccess);
    }

    #endregion

    #region Methods

    private async Task AddInventoryItemAsync(
        Guid inventoryItemId, 
        Guid productId, 
        string productName, 
        string location, 
        int qty, 
        Actor actor)
    {
        var entity = InventoryItemEntity.Create(
            id: inventoryItemId,
            productId: productId,
            productName: productName,
            location: location,
            quantity: qty,
            performedBy: actor.ToString());

        await dbContext.InventoryItems.AddAsync(entity);
    }

    #endregion
}