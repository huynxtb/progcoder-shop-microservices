namespace EventSourcing.Events.Catalog;

public sealed record class DeletedUnPublishedProductIntegrationEvent : IntegrationEvent
{
    #region Fields, Properties and Indexers

    public Guid ProductId { get; init; }

    #endregion
}