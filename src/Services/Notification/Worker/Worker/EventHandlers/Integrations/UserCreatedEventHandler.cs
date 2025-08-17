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
    INotificationTemplateRepository tmplRepo,
    INotificationDeliveryRepository deliveryRepo,
    ILogger<UserCreatedEventHandler> logger)
    : IConsumer<UserCreatedEvent>
{
    public async Task Consume(ConsumeContext<UserCreatedEvent> context)
    {
        logger.LogInformation("Integration Event handled: {IntegrationEvent}", context.Message.GetType().Name);

        var message = context.Message;

        var tmplDoc = await tmplRepo.GetAsync(
            key: TemplateKey.UserRegistered,
            channel: Domain.Enums.ChannelType.Email);

        var data = new Dictionary<string, object>()
        {
            { TemplateKeyMap.DisplayName, $"{message.FirstName} {message.LastName}" }
        };

        var body = renderer.Render(tmplDoc.Body!, data);

        var ndDocs = NotificationDelivery.Create(
            channel: Domain.Enums.ChannelType.Email,
            address: message.Email!,
            subject: tmplDoc.Subject!,
            body: body,
            priority: Domain.Enums.DeliveryPriority.Medium,
            modifiedBy: SystemConst.DefaultModifiedBy);

        await deliveryRepo.UpsertAsync(ndDocs);
    }
}