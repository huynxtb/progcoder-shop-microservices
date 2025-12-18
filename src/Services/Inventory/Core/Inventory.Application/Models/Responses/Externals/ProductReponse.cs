namespace Inventory.Application.Models.Responses.Externals;

public class ProductReponse
{
    #region Fields, Properties and Indexers

    public Guid Id { get; set; }

    public string Name { get; set; } = null!;

    public string Thumbnail { get; set; } = null!;

    public decimal Price { get; set; }

    #endregion
}
