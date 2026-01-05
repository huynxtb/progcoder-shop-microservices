#region using

using EventSourcing.Events.Catalog;
using MassTransit;
using MediatR;
using Search.Application.Features.Product.Commands;

#endregion

namespace Search.Worker.Consumer.EventHandlers.Integrations;

public sealed class DeletedUnPublishedProductIntegrationEventHandler(
    ISender sender,
    ILogger<DeletedUnPublishedProductIntegrationEventHandler> logger)
    : IConsumer<DeletedUnPublishedProductIntegrationEvent>
{
    #region Methods

    public async Task Consume(ConsumeContext<DeletedUnPublishedProductIntegrationEvent> context)
    {
        logger.LogInformation("Integration Event handled: {IntegrationEvent}", context.Message.GetType().Name);

        var integrationEvent = context.Message;

        var command = new DeleteProductCommand(integrationEvent.ProductId.ToString());
        await sender.Send(command, context.CancellationToken);
    }

    #endregion
}

