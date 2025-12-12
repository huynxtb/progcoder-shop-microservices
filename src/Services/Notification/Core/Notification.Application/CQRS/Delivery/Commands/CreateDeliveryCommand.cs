#region using

using Notification.Application.Dtos.Deliveries;
using Notification.Application.Data.Repositories;
using Notification.Application.Providers;
using Notification.Domain.Entities;
using Notification.Domain.Enums;
using BuildingBlocks.Abstractions.ValueObjects;
using Common.Constants;
using Microsoft.Extensions.Logging;

#endregion

namespace Notification.Application.CQRS.Delivery.Commands;

public sealed record CreateDeliveryCommand(CreateDeliveryDto Dto, Actor Actor) : ICommand<Guid>;

public sealed class CreateDeliveryCommandValidator : AbstractValidator<CreateDeliveryCommand>
{
    #region Ctors

    public CreateDeliveryCommandValidator()
    {
        RuleFor(x => x.Dto.EventId)
            .NotEmpty()
            .WithMessage(MessageCode.EventIdIsRequired);

        RuleFor(x => x.Dto.TemplateKey)
            .NotEmpty()
            .WithMessage(MessageCode.TemplateKeyIsRequired);

        RuleFor(x => x.Dto.To)
            .NotEmpty()
            .WithMessage(MessageCode.ToRecipientsIsRequired)
            .Must(to => to != null && to.Count > 0)
            .WithMessage(MessageCode.AtLeastOneRecipientIsRequired);

        RuleFor(x => x.Dto.MaxAttempts)
            .GreaterThan(0)
            .WithMessage(MessageCode.MaxAttemptsMustBeGreaterThanZero);
    }

    #endregion
}

public sealed class CreateDeliveryCommandHandler(
    IQueryTemplateRepository templateRepo,
    IQueryDeliveryRepository deliveryQueryRepo,
    ICommandDeliveryRepository deliveryCommandRepo,
    ITemplateProvider templateProvider,
    ILogger<CreateDeliveryCommandHandler> logger)
    : ICommandHandler<CreateDeliveryCommand, Guid>
{
    #region Implementations

    public async Task<Guid> Handle(CreateDeliveryCommand command, CancellationToken cancellationToken)
    {
        var dto = command.Dto;

        // Check if delivery already exists for this event
        var existing = await deliveryQueryRepo.GetByEventIdAsync(dto.EventId, cancellationToken);
        if (existing != null)
        {
            logger.LogWarning("Delivery already exists for EventId: {EventId}", dto.EventId);
            return existing.Id;
        }

        // Get template
        var template = await templateRepo.GetAsync(
            key: dto.TemplateKey,
            channel: dto.ChannelType,
            cancellationToken: cancellationToken);

        if (template == null) throw new NotFoundException(MessageCode.TemplateNotFound);

        // Render template body with data
        var templateVariables = dto.TemplateVariables ?? new Dictionary<string, object>();
        var renderedBody = templateProvider.Render(template.Body!, templateVariables);

        // Create delivery entity
        var deliveryId = Guid.NewGuid();
        var delivery = DeliveryEntity.Create(
            id: deliveryId,
            channel: dto.ChannelType,
            to: dto.To,
            subject: template.Subject!,
            isHtml: template.IsHtml,
            body: renderedBody,
            priority: dto.Priority,
            eventId: dto.EventId,
            performedBy: command.Actor.ToString(),
            maxAttempts: dto.MaxAttempts,
            cc: dto.Cc,
            bcc: dto.Bcc);

        // Save delivery
        await deliveryCommandRepo.UpsertAsync(delivery, cancellationToken);

        logger.LogInformation("Delivery created with Id: {DeliveryId} for EventId: {EventId}", deliveryId, dto.EventId);

        return deliveryId;
    }

    #endregion
}

