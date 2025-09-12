namespace BuildingBlocks.Pagination;

public sealed class PagingResult
{
    #region Fields, Properties and Indexers

    public long Total { get; private set; }

    public int PageNumber { get; private set; }

    public int PageSize { get; private set; }

    public bool HasItem { get; private set; }

    public int TotalPages { get; private set; }

    public bool HasNextPage { get; private set; }

    public bool HasPreviousPage { get; private set; }

    #endregion

    #region Ctors

    private PagingResult(long total, int pageNumber, int pageSize)
    {
        Total = total;
        PageNumber = pageNumber;
        PageSize = pageSize;
        HasItem = total > 0;
    }

    #endregion

    #region Methods

    public static PagingResult Of(long total, int pageNumber, int pageSize)
    {
        var result = new PagingResult(total, pageNumber, pageSize);
        if (pageSize > 0)
        {
            result.TotalPages = (int)Math.Ceiling(total / (double)pageSize);
            result.HasNextPage = pageNumber < result.TotalPages;
            result.HasPreviousPage = pageNumber > 1 && pageNumber <= result.TotalPages;
        }
        return result;
    }

    #endregion
}
