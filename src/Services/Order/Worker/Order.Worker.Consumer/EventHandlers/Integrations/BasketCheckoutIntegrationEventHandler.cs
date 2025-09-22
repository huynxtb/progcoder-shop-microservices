#region using

using BuildingBlocks.Abstractions.ValueObjects;
using Common.Constants;
using EventSourcing.Events.Baskets;
using Mapster;
using MassTransit;
using MediatR;
using Order.Application.CQRS.Order.Commands;
using Order.Application.Dtos.Orders;

#endregion

namespace Order.Worker.Consumer.EventHandlers.Integrations;

public sealed class BasketCheckoutIntegrationEventHandler(IMediator sender, ILogger<BasketCheckoutIntegrationEventHandler> logger)
    : IConsumer<BasketCheckoutIntegrationEvent>
{
    #region Methods

    public async Task Consume(ConsumeContext<BasketCheckoutIntegrationEvent> context)
    {
        logger.LogInformation("Integration Event handled: {IntegrationEvent}", context.Message.GetType().Name);

        var message = context.Message;
        var dto = new CreateOrUpdateOrderDto
        {
            BasketId = message.BasketId,
            Customer = message.Customer.Adapt<CustomerDto>(),
            ShippingAddress = message.ShippingAddress.Adapt<AddressDto>(),
            Items = message.Items.Adapt<List<CreateOrderItemDto>>(),
            TotalPrice = message.TotalPrice
        };
        var command = new CreateOrderCommand(
            );

        if (message.Amount > 0)
        {
            await sender.Send(new ChangeProductStatusCommand(message.ProductId, ProductStatus.InStock, Actor.Worker(Constants.Worker.Catalog)));
        }
        else
        {
            await sender.Send(new ChangeProductStatusCommand(message.ProductId, ProductStatus.OutOfStock, Actor.Worker(Constants.Worker.Catalog)));
        }
    }

    #endregion
}