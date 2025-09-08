namespace Inventory.Application.Models.Responses.Externals;

public class ProductReponse
{
    #region Fields, Properties and Indexers

    public Guid Id { get; init; } = default!;

    public string Name { get; init; } = default!;

    public string Sku { get; init; } = default!;

    public bool Published { get; init; }

    public decimal Price { get; init; }

    #endregion
}
