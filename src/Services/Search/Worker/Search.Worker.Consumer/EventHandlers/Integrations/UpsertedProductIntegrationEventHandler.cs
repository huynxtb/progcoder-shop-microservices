#region using

using EventSourcing.Events.Catalog;
using MassTransit;
using MediatR;
using Search.Application.CQRS.Product.Commands;
using Search.Application.Dtos.Products;
using Search.Domain.Enums;

#endregion

namespace Search.Worker.Consumer.EventHandlers.Integrations;

public sealed class UpsertedProductIntegrationEventHandler(
    ISender sender,
    ILogger<UpsertedProductIntegrationEventHandler> logger)
    : IConsumer<UpsertedProductIntegrationEvent>
{
    #region Methods

    public async Task Consume(ConsumeContext<UpsertedProductIntegrationEvent> context)
    {
        logger.LogInformation("Integration Event handled: {IntegrationEvent}", context.Message.GetType().Name);

        var integrationEvent = context.Message;

        // Map integration event to DTO
        var dto = new UpsertProductDto
        {
            ProductId = integrationEvent.ProductId.ToString(),
            Name = integrationEvent.Name,
            Sku = integrationEvent.Sku,
            Slug = integrationEvent.Slug,
            Price = integrationEvent.Price,
            SalePrice = integrationEvent.SalePrice,
            Categories = integrationEvent.Categories,
            Images = integrationEvent.Images,
            Thumbnail = integrationEvent.Thumbnail,
            Status = (ProductStatus)integrationEvent.Status,
            CreatedOnUtc = integrationEvent.CreatedOnUtc,
            CreatedBy = integrationEvent.CreatedBy,
            LastModifiedOnUtc = integrationEvent.LastModifiedOnUtc,
            LastModifiedBy = integrationEvent.LastModifiedBy
        };

        var command = new UpsertProductCommand(dto);
        await sender.Send(command, context.CancellationToken);
    }

    #endregion
}

