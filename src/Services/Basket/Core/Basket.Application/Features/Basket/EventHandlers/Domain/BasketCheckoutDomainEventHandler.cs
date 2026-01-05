#region using

using Basket.Application.Repositories;
using Basket.Domain.Entities;
using Basket.Domain.Events;
using EventSourcing.Events.Baskets;
using MediatR;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

#endregion

namespace Basket.Application.Features.Basket.EventHandlers.Domain;

public sealed class BasketCheckoutDomainEventHandler(
    IOutboxRepository outboxRepo,
    ILogger<BasketCheckoutDomainEventHandler> logger) : INotificationHandler<BasketCheckoutDomainEvent>
{
    #region Implementations

    public async Task Handle(BasketCheckoutDomainEvent @event, CancellationToken cancellationToken)
    {
        logger.LogInformation("Domain Event handled: {DomainEvent}", @event.GetType().Name);

        await PushToOutboxAsync(@event, cancellationToken);
    }

    #endregion

    #region Methods

    private async Task PushToOutboxAsync(BasketCheckoutDomainEvent @event, CancellationToken cancellationToken)
    {
        var message = new BasketCheckoutIntegrationEvent
        {
            Id = Guid.NewGuid().ToString(),
            BasketId = @event.Basket.Id,
            Customer = new CustomerIntegrationEvent
            {
                Id = @event.Customer.Id,
                Name = @event.Customer.Name,
                Email = @event.Customer.Email,
                PhoneNumber = @event.Customer.PhoneNumber
            },
            ShippingAddress = new AddressIntegrationEvent
            {
                AddressLine = @event.ShippingAddress.AddressLine,
                Subdivision = @event.ShippingAddress.Subdivision,
                City = @event.ShippingAddress.City,
                StateOrProvince = @event.ShippingAddress.StateOrProvince,
                Country = @event.ShippingAddress.Country,
                PostalCode = @event.ShippingAddress.PostalCode
            },
            Discount = new DiscountIntegrationEvent
            {
                CouponCode = @event.Discount.CouponCode,
                DiscountAmount = @event.Discount.DiscountAmount
            },
            Items = @event.Basket.Items?.Select(item => new CartItemIntegrationEvent
            {
                ProductId = item.ProductId,
                Quantity = item.Quantity
            }).ToList() ?? new List<CartItemIntegrationEvent>()
        };

        var outboxMessage = OutboxMessageEntity.Create(
            id: Guid.NewGuid(),
            eventType: message.EventType!,
            content: JsonConvert.SerializeObject(message),
            occurredOnUtc: DateTimeOffset.UtcNow);

        var result = await outboxRepo.AddMessageAsync(outboxMessage, cancellationToken);

        if (!result)
        {
            logger.LogWarning("Failed to add message to outbox. BasketId: {BasketId}", @event.Basket.Id);
            throw new InvalidOperationException("Failed to add message to outbox");
        }

        logger.LogInformation(
            "Successfully added basket checkout event to outbox. BasketId: {BasketId}, MessageId: {MessageId}",
            @event.Basket.Id,
            outboxMessage.Id);
    }

    #endregion
}