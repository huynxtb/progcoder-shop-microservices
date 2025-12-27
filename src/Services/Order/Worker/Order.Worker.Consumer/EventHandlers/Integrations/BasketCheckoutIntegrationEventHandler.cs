#region using

using BuildingBlocks.Abstractions.ValueObjects;
using EventSourcing.Events.Baskets;
using MassTransit;
using MediatR;
using Order.Application.CQRS.Order.Commands;
using Order.Application.Dtos.Orders;
using Order.Application.Dtos.ValueObjects;

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
            Customer = new CustomerDto
            {
                Id = message.Customer.Id,
                Name = message.Customer.Name,
                Email = message.Customer.Email,
                PhoneNumber = message.Customer.PhoneNumber
            },
            ShippingAddress = new AddressDto
            {
                AddressLine = message.ShippingAddress.AddressLine,
                Subdivision = message.ShippingAddress.Subdivision,
                City = message.ShippingAddress.City,
                StateOrProvince = message.ShippingAddress.StateOrProvince,
                Country = message.ShippingAddress.Country,
                PostalCode = message.ShippingAddress.PostalCode
            },
            OrderItems = message.Items.Select(item => new CreateOrderItemDto
            {
                ProductId = item.ProductId,
                Quantity = item.Quantity
            }).ToList(),
            CouponCode = message.Discount.CouponCode
        };
        
        var command = new CreateOrderCommand(dto, Actor.User(dto.Customer.Id.ToString()!));

        await sender.Send(command, context.CancellationToken);
    }

    #endregion
}