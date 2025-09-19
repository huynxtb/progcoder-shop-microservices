namespace EventSourcing.Events.Baskets;

public sealed record BasketCheckoutIntegrationEvent : IntegrationEvent
{
    #region Fields, Properties and Indexers

    public Guid BasketId { get; init; }

    public BasketCheckoutCustomerIntegrationEvent Customer { get; init; } = default!;

    public BasketCheckoutAddressIntegrationEvent ShippingAddress { get; init; } = default!;

    public IReadOnlyCollection<BasketCheckoutItemIntegrationEvent> Items { get; init; } = Array.Empty<BasketCheckoutItemIntegrationEvent>();

    public decimal TotalPrice { get; init; }

    #endregion
}

public sealed record BasketCheckoutCustomerIntegrationEvent
{
    public Guid? Id { get; init; }

    public string Name { get; init; } = default!;

    public string Email { get; init; } = default!;

    public string PhoneNumber { get; init; } = default!;
}

public sealed record BasketCheckoutAddressIntegrationEvent
{
    public string Name { get; init; } = default!;

    public string EmailAddress { get; init; } = default!;

    public string AddressLine { get; init; } = default!;

    public string Country { get; init; } = default!;

    public string State { get; init; } = default!;

    public string ZipCode { get; init; } = default!;
}

public sealed record BasketCheckoutItemIntegrationEvent
{
    public Guid ProductId { get; init; }

    public int Quantity { get; init; }
}
