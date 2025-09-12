namespace Inventory.Application.Models.Responses.Externals;

public class ProductInfoReponse
{
    #region Fields, Properties and Indexers

    public Guid Id { get; set; }

    public string Name { get; set; } = null!;

    public string Thumbnail { get; set; } = null!;

    public decimal Price { get; set; }

    #endregion
}
