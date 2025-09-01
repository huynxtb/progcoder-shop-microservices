#region using

using EventSourcing.Events.Inventories;
using Inventory.Application.Data;
using Inventory.Application.Dtos.InventoryItems;
using Inventory.Application.Services;
using Inventory.Domain.Entities;
using Inventory.Domain.Enums;
using SourceCommon.Models.Reponses;

#endregion

namespace Inventory.Application.CQRS.InventoryItem.Commands;

public sealed record CreateInventoryItemCommand(CreateInventoryItemDto Dto, Guid CurrentUserId) : ICommand<ResultSharedResponse<string>>;

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

        var entity = InventoryItemEntity.Create(
            id: Guid.NewGuid(),
            productId: product.Data.Id,
            productName: product.Data.Name!,
            location: dto.Location!,
            quantity: dto.Quantity,
            createdBy: command.CurrentUserId.ToString());

        var message = new StockChangedIntegrationEvent()
        {
            Amount = dto.Quantity,
            ChangeType = (int)InventoryChangeType.Increase,
            InventoryItemId = entity.Id,
            ProductId = entity.ProductId,
        }
        var outboxMessage = OutboxMessageEntity.Create(
            type: "InventoryItemCreated",
            payload: entity.Adapt<InventoryItemCreatedEvent>(),
            occurredOnUtc: DateTime.UtcNow,
            processedOnUtc: null);

        await dbContext.InventoryItems.AddAsync(entity);
        await dbContext.SaveChangesAsync(cancellationToken);

        return ResultSharedResponse<string>.Success(
            data: entity.Id.ToString(),
            message: MessageCode.CreateSuccess);
    }

    #endregion

    #region Methods

    private void PushToOutbox(OutboxMessageEntity outboxMessage)
    {
        dbContext.OutboxMessages.Add(outboxMessage);
    }

    #endregion
}