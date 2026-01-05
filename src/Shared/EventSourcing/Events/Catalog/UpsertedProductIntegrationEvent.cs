namespace EventSourcing.Events.Catalog;

public sealed record class UpsertedProductIntegrationEvent : IntegrationEvent
{
    #region Fields, Properties and Indexers

    public Guid ProductId { get; init; }

    public string Name { get; init; } = default!;

    public string Sku { get; init; } = default!;

    public string Slug { get; init; } = default!;

    public decimal Price { get; init; } = default!;

    public decimal? SalePrice { get; init; } = default!;

    public List<string>? Categories { get; init; } = default!;

    public List<string>? Images { get; init; } = default!;

    public string Thumbnail { get; init; } = default!;

    public int Status { get; init; }

    public bool Published { get; init; }

    public DateTimeOffset CreatedOnUtc { get; init; }

    public string? CreatedBy { get; init; }

    public DateTimeOffset? LastModifiedOnUtc { get; init; }

    public string? LastModifiedBy { get; init; }

    #endregion
}
