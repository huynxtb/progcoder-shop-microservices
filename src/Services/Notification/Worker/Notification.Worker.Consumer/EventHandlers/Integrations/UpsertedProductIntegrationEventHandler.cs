#region using

using EventSourcing.Events.Catalog;
using MassTransit;
using MediatR;
using Notification.Application.CQRS.Delivery.Commands;
using Notification.Application.Dtos.Deliveries;
using Notification.Application.Constants;
using Notification.Domain.Enums;
using BuildingBlocks.Abstractions.ValueObjects;
using Common.Constants;

#endregion

namespace Notification.Worker.Consumer.EventHandlers.Integrations;

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
        var templateVariables = new Dictionary<string, object>
        {
            { TemplateVariables.ProductName, integrationEvent.Name },
            { TemplateVariables.PerformBy, integrationEvent.LastModifiedBy! }
        };

        var deliveryDto = new CreateDeliveryDto
        {
            EventId = integrationEvent.Id,
            TemplateKey = TemplateKey.ProductUpserted,
            ChannelType = ChannelType.Discord,
            To = [],
            TemplateVariables = templateVariables,
            Priority = DeliveryPriority.Medium,
            MaxAttempts = AppConstants.MaxAttempts
        };

        var deliveryCommand = new CreateDeliveryCommand(deliveryDto, Actor.Worker(AppConstants.Service.Notification));

        await sender.Send(deliveryCommand, context.CancellationToken);
    }

    #endregion
}

