#region using

using Common.ValueObjects;
using EventSourcing.Events.Baskets;
using MassTransit;
using MediatR;
using Order.Application.Features.Order.Commands;
using Order.Application.Dtos.Orders;
using Order.Application.Dtos.ValueObjects;
using Order.Domain.Abstractions;
using Order.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

#endregion

namespace Order.Worker.Consumer.EventHandlers.Integrations;

public sealed class BasketCheckoutIntegrationEventHandler(
    IMediator sender,
    IUnitOfWork unitOfWork,
    ILogger<BasketCheckoutIntegrationEventHandler> logger)
    : IConsumer<BasketCheckoutIntegrationEvent>
{
    #region Methods

    public async Task Consume(ConsumeContext<BasketCheckoutIntegrationEvent> context)
    {
        var message = context.Message;
        var messageId = context.MessageId ?? Guid.NewGuid();

        // Check if message already exists in inbox (idempotency)
        var existingMessage = await unitOfWork.InboxMessages
            .FirstOrDefaultAsync(m => m.Id == messageId, context.CancellationToken);

        if (existingMessage != null)
        {
            logger.LogInformation("Message {MessageId} already processed. Skipping.", messageId);
            return;
        }

        // Create inbox record to track this event
        var inboxMessage = InboxMessageEntity.Create(
            messageId,
            message.GetType().AssemblyQualifiedName!,
            JsonSerializer.Serialize(message),
            DateTimeOffset.UtcNow);

        await unitOfWork.InboxMessages.AddAsync(inboxMessage, context.CancellationToken);
        await unitOfWork.SaveChangesAsync(context.CancellationToken);

        logger.LogInformation("Processing integration event {EventType} with ID {MessageId}",
            message.GetType().Name, messageId);

        try
        {
            // Process the event
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

            // Mark as successfully processed
            inboxMessage.CompleteProcessing(DateTimeOffset.UtcNow);
            await unitOfWork.SaveChangesAsync(context.CancellationToken);

            logger.LogInformation("Successfully processed event {MessageId}", messageId);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Failed to process event {MessageId}", messageId);

            // Mark as failed
            inboxMessage.CompleteProcessing(DateTimeOffset.UtcNow, ex.Message);
            await unitOfWork.SaveChangesAsync(context.CancellationToken);

            throw;
        }
    }

    #endregion
}