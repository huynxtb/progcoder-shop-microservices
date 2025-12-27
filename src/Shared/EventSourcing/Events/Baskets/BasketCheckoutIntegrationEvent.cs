namespace EventSourcing.Events.Baskets;

public sealed record BasketCheckoutIntegrationEvent : IntegrationEvent
{
    #region Fields, Properties and Indexers

    public Guid BasketId { get; init; }

    public CustomerIntegrationEvent Customer { get; init; } = default!;

    public AddressIntegrationEvent ShippingAddress { get; init; } = default!;

    public DiscountIntegrationEvent Discount { get; init; } = default!;

    public IReadOnlyCollection<CartItemIntegrationEvent> Items { get; init; } = Array.Empty<CartItemIntegrationEvent>();

    #endregion
}

public sealed record CustomerIntegrationEvent
{
    public Guid? Id { get; init; }

    public string Name { get; init; } = default!;

    public string Email { get; init; } = default!;

    public string PhoneNumber { get; init; } = default!;
}

public sealed record AddressIntegrationEvent
{
    public string AddressLine { get; init; } = default!;

    public string Ward { get; init; } = default!;

    public string District { get; init; } = default!;

    public string City { get; init; } = default!;

    public string Country { get; init; } = default!;

    public string State { get; init; } = default!;

    public string ZipCode { get; init; } = default!;
}

public sealed record CartItemIntegrationEvent
{
    public Guid ProductId { get; init; }

    public int Quantity { get; init; }
}

public sealed record DiscountIntegrationEvent
{
    public string CouponCode { get; init; } = default!;

    public decimal DiscountAmount { get; init; }
}
