namespace BuildingBlocks.Pagination;

public sealed class PaginationResponse
{
    #region Fields, Properties and Indexers

    public long Total { get; set; }

    public int PageNumber { get; set; }

    public int PageSize { get; set; }

    public bool HasItem { get; set; }

    public long TotalPages { get; set; }

    public bool HasNextPage { get; set; }

    public bool HasPreviousPage { get; set; }

    #endregion
}
