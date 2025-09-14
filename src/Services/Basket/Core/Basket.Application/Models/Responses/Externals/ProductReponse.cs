namespace Basket.Application.Models.Responses.Externals;

public class ProductReponse
{
    #region Fields, Properties and Indexers

    public Guid Id { get; init; } = default!;

    public string Name { get; init; } = default!;

    public decimal Price { get; init; }

    public string Thumbnail { get; init; } = default!;

    #endregion
}
