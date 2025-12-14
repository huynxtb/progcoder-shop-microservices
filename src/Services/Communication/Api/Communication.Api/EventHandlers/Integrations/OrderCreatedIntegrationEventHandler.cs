#region using

using Communication.Api.Models;
using Communication.Api.Services;
using EventSourcing.Events.Orders;
using MassTransit;

#endregion

namespace Communication.Api.EventHandlers.Integrations;

public sealed class OrderCreatedIntegrationEventHandler(
    INotificationHubService notificationHubService,
    ILogger<OrderCreatedIntegrationEventHandler> logger)
    : IConsumer<OrderCreatedIntegrationEvent>
{
    #region Methods

    public async Task Consume(ConsumeContext<OrderCreatedIntegrationEvent> context)
    {
        logger.LogInformation("Integration Event handled: {IntegrationEvent}", context.Message.GetType().Name);

        var message = context.Message;

        try
        {
            var notification = new NotificationDto
            {
                Type = NotificationType.OrderCreated,
                Title = "New Order Created",
                Message = $"You have new order #{message.OrderNo}. Total: {message.FinalPrice:C}",
                Data = message
            };

            await notificationHubService.BroadcastNotificationAsync(notification, context.CancellationToken);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error handling OrderCreatedIntegrationEvent for OrderNo: {OrderNo}", message.OrderNo);
        }
    }

    #endregion
}