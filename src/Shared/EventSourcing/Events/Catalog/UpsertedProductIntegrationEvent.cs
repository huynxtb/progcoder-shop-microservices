namespace EventSourcing.Events.Catalog;

public sealed record class UpsertedProductIntegrationEvent : IntegrationEvent
{
    #region Fields, Properties and Indexers

    public Guid ProductId { get; set; }

    public string Name { get; set; } = default!;

    public string Sku { get; set; } = default!;

    public string Slug { get; set; } = default!;

    public decimal Price { get; set; } = default!;

    public decimal? SalePrice { get; set; } = default!;

    public List<string>? Categories { get; set; } = default!;

    public List<string>? Images { get; set; } = default!;

    public string Thumbnail { get; set; } = default!;

    public int Status { get; set; }

    public bool Published { get; set; }

    public DateTimeOffset CreatedOnUtc { get; set; }

    public string? CreatedBy { get; set; }

    public DateTimeOffset? LastModifiedOnUtc { get; set; }

    public string? LastModifiedBy { get; set; }

    #endregion
}
