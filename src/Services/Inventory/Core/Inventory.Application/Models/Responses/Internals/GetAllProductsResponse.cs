#region using

using Inventory.Application.Models.Responses.Externals;

#endregion

namespace Inventory.Application.Models.Responses.Internals;

public sealed class GetAllProductsResponse
{
    #region Fields, Properties and Indexers

    public List<ProductReponse>? Items { get; set; }

    #endregion
}
