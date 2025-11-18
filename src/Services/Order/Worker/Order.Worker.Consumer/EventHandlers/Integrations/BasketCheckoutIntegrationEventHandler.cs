#region using

using BuildingBlocks.Abstractions.ValueObjects;
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
            Customer = message.Customer.Adapt<CustomerDto>(),
            ShippingAddress = message.ShippingAddress.Adapt<AddressDto>(),
            OrderItems = message.Items.Adapt<List<CreateOrderItemDto>>()
        };
        
        var command = new CreateOrderCommand(dto, Actor.User(dto.Customer.Id.ToString()!));

        await sender.Send(command);
    }

    #endregion
}