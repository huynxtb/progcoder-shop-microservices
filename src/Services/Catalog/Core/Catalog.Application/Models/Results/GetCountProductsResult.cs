namespace Catalog.Application.Models.Results;

public sealed class GetCountProductsResult
{
    #region Fields, Properties and Indexers

    public int Count { get; set; }

    #endregion

    #region Ctors

    public GetCountProductsResult(int count)
    {
        Count = count;
    }

    #endregion
}
