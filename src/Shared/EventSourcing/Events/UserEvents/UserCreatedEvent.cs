namespace EventSourcing.Events.UserEvents;

public sealed record UserCreatedEvent : IntegrationEvent
{
    #region Fields, Properties and Indexers

    public Guid Id { get; set; }

    public string? UserName { get; set; }

    public string? Email { get; set; }

    public string? FirstName { get; set; }

    public string? LastName { get; set; }

    public string? PhoneNumber { get; set; }

    #endregion
}
