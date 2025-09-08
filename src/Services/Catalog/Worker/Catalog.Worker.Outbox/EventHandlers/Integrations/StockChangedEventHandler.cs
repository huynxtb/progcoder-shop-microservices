#region using

using BuildingBlocks.Abstractions.ValueObjects;
using Catalog.Application.CQRS.Product.Commands;
using Catalog.Domain.Enums;
using Common.Constants;
using EventSourcing.Events.Inventories;
using MassTransit;
using MediatR;

#endregion

namespace Catalog.Worker.Consumer.EventHandlers.Integrations;

public sealed class StockChangedEventHandler(IMediator sender, ILogger<StockChangedEventHandler> logger)
    : IConsumer<StockChangedIntegrationEvent>
{
    public async Task Consume(ConsumeContext<StockChangedIntegrationEvent> context)
    {
        logger.LogInformation("Integration Event handled: {IntegrationEvent}", context.Message.GetType().Name);

        var message = context.Message;

        if (message.Amount > 0)
        {
            await sender.Send(new ChangeProductStatusCommand(message.ProductId, ProductStatus.InStock, Actor.Worker(Constants.Worker.Catalog)));
        }
        else
        {
            await sender.Send(new ChangeProductStatusCommand(message.ProductId, ProductStatus.OutOfStock, Actor.Worker(Constants.Worker.Catalog)));
        }
    }
}