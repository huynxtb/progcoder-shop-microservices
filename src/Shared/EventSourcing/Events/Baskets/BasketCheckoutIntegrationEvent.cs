namespace EventSourcing.Events.Baskets;

public sealed record BasketCheckoutIntegrationEvent : IntegrationEvent
{
    #region Fields, Properties and Indexers

    public Guid BasketId { get; init; }

    public string UserId { get; init; } = default!;

    public string PerformedBy { get; init; } = default!;

    public BasketCheckoutCustomer Customer { get; init; } = default!;

    public BasketCheckoutAddress ShippingAddress { get; init; } = default!;

    public IReadOnlyCollection<BasketCheckoutItem> Items { get; init; } = Array.Empty<BasketCheckoutItem>();

    public decimal TotalPrice { get; init; }

    #endregion
}

public sealed record BasketCheckoutCustomer
{
    public Guid? Id { get; init; }

    public string Name { get; init; } = default!;

    public string Email { get; init; } = default!;

    public string PhoneNumber { get; init; } = default!;
}

public sealed record BasketCheckoutAddress
{
    public string Name { get; init; } = default!;

    public string EmailAddress { get; init; } = default!;

    public string AddressLine { get; init; } = default!;

    public string Country { get; init; } = default!;

    public string State { get; init; } = default!;

    public string ZipCode { get; init; } = default!;
}

public sealed record BasketCheckoutItem
{
    public Guid ProductId { get; init; }

    public int Quantity { get; init; }
}
