#region using

using EventSourcing.Events.UserEvents;
using MassTransit;
using Notification.Application.Constants;
using Notification.Application.Data.Repositories;
using Notification.Application.Services;
using Notification.Domain.Entities;
using SourceCommon.Constants;

#endregion

namespace Notification.Worker.EventHandlers.Integrations;

public sealed class UserCreatedEventHandler(
    ITemplateRenderer renderer,
    IQueryNotificationTemplateRepository tmplRepo,
    ICommandNotificationDeliveryRepository deliveryRepo,
    ILogger<UserCreatedEventHandler> logger)
    : IConsumer<UserCreatedEvent>
{
    public async Task Consume(ConsumeContext<UserCreatedEvent> context)
    {
        logger.LogInformation("Integration Event handled: {IntegrationEvent}", context.Message.GetType().Name);

        var message = context.Message;

        var existing = await deliveryRepo.GetByEventIdAsync(message.EventId);

        if (existing != null) return;

        var tmplDoc = await tmplRepo.GetAsync(
            key: TemplateKey.UserRegistered,
            channel: Domain.Enums.ChannelType.Email);

        var data = new Dictionary<string, object>()
        {
            { TemplateKeyMap.DisplayName, $"{message.FirstName} {message.LastName}" }
        };

        var body = renderer.Render(tmplDoc.Body!, data);

        var ndDocs = NotificationDelivery.Create(
            id: Guid.NewGuid(),
            eventId: message.EventId,
            channel: Domain.Enums.ChannelType.Email,
            to: [message.Email!],
            subject: tmplDoc.Subject!,
            body: body,
            isHtml: tmplDoc.IsHtml,
            priority: Domain.Enums.DeliveryPriority.Medium,
            createdBy: SystemConst.CreatedBySystem);

        await deliveryRepo.UpsertAsync(ndDocs);
    }
}