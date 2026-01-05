#region using

using EventSourcing.Events.Catalog;
using MassTransit;
using MediatR;
using Notification.Application.Features.Delivery.Commands;
using Notification.Application.Dtos.Deliveries;
using Notification.Application.Constants;
using Notification.Domain.Enums;
using BuildingBlocks.Abstractions.ValueObjects;
using Common.Constants;
using Common.Extensions;
using Notification.Application.Services;
using Common.Configurations;

#endregion

namespace Notification.Worker.Consumer.EventHandlers.Integrations;

public sealed class UpsertedProductIntegrationEventHandler(
    ISender sender,
    IKeycloakService keycloak,
    IConfiguration cfg,
    ILogger<UpsertedProductIntegrationEventHandler> logger)
    : IConsumer<UpsertedProductIntegrationEvent>
{
    #region Methods

    public async Task Consume(ConsumeContext<UpsertedProductIntegrationEvent> context)
    {
        logger.LogInformation("Integration Event handled: {IntegrationEvent}", context.Message.GetType().Name);

        var webAdminUrl = cfg.GetValue<string>($"{AppDomainCfg.Section}:{AppDomainCfg.WebAdminUrl}");
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
            To = [ChannelType.Discord.GetDescription()],
            TemplateVariables = templateVariables,
            Priority = DeliveryPriority.Medium,
            MaxAttempts = AppConstants.MaxAttempts,
            TargetUrl = $"/products/{integrationEvent.ProductId}"
        };

        var deliveryCommand = new CreateDeliveryCommand(deliveryDto, Actor.Worker(AppConstants.Service.Notification));

        await sender.Send(deliveryCommand, context.CancellationToken);

        var adminUsers = await keycloak.GetUsersByRoleAsync(AuthorizeRole.SystemAdmin, context.CancellationToken);
        
        if (!adminUsers.Any())
        {
            logger.LogWarning("No admin users found to notify for product upserted event: {ProductId}", integrationEvent.ProductId);
            return;
        }

        deliveryDto.To.Clear();
        deliveryDto.EventId = Guid.NewGuid().ToString();
        deliveryDto.ChannelType = ChannelType.Email;
        deliveryDto.To.AddRange(adminUsers.Select(x => x.Email!));

        var adminDeliveryEmailCommand = new CreateDeliveryCommand(deliveryDto, Actor.Worker(AppConstants.Service.Notification));
        await sender.Send(adminDeliveryEmailCommand, context.CancellationToken);

        deliveryDto.To.Clear();
        deliveryDto.EventId = Guid.NewGuid().ToString();
        deliveryDto.ChannelType = ChannelType.InApp;
        deliveryDto.To.AddRange(adminUsers.Select(x => x.Id!));

        var adminDeliveryInAppCommand = new CreateDeliveryCommand(deliveryDto, Actor.Worker(AppConstants.Service.Notification));
        await sender.Send(adminDeliveryInAppCommand, context.CancellationToken);
    }

    #endregion
}

