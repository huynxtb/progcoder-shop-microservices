#region using

using EventSourcing.Events.Inventories;
using Inventory.Application.Data;
using Inventory.Application.Dtos.InventoryItems;
using Inventory.Application.Services;
using Inventory.Domain.Entities;
using Inventory.Domain.Enums;
using Common.Models.Reponses;
using Newtonsoft.Json;
using BuildingBlocks.Abstractions.ValueObjects;

#endregion

namespace Inventory.Application.CQRS.InventoryItem.Commands;

public sealed record CreateInventoryItemCommand(CreateInventoryItemDto Dto, Actor Actor) : ICommand<ResultSharedResponse<string>>;

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
    ICatalogApiService catalogApi) : ICommandHandler<CreateInventoryItemCommand, ResultSharedResponse<string>>
{
    #region Implementations

    public async Task<ResultSharedResponse<string>> Handle(CreateInventoryItemCommand command, CancellationToken cancellationToken)
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
        await PushToOutboxAsync(inventoryItemId, dto);
        await dbContext.SaveChangesAsync(cancellationToken);

        return ResultSharedResponse<string>.Success(
            data: inventoryItemId.ToString(),
            message: MessageCode.CreateSuccess);
    }

    #endregion

    #region Methods

    private async Task PushToOutboxAsync(Guid inventoryItemId, CreateInventoryItemDto dto)
    {
        if (dto.Quantity > 0)
        {
            var message = new StockChangedIntegrationEvent()
            {
                InventoryItemId = inventoryItemId,
                ProductId = dto.ProductId,
                ChangeType = (int)InventoryChangeType.Init,
                Amount = dto.Quantity,
                Source = InventorySource.ManualAdjustment.GetDescription()
            };
            var outboxMessage = OutboxMessageEntity.Create(
                id: Guid.NewGuid(),
                eventType: message.EventType!,
                content: JsonConvert.SerializeObject(message),
                occurredOnUtc: DateTimeOffset.UtcNow);

            await dbContext.OutboxMessages.AddAsync(outboxMessage);
        }
    }

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