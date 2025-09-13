#region using

using BuildingBlocks.Pagination.Extensions;

#endregion

namespace BuildingBlocks.Pagination;

public sealed class PagingResult
{
    #region Fields, Properties and Indexers

    public long TotalCount { get; private set; }

    public int PageNumber { get; private set; }

    public int PageSize { get; private set; }

    public bool HasItem { get; private set; }

    public int TotalPages { get; private set; }

    public bool HasNextPage { get; private set; }

    public bool HasPreviousPage { get; private set; }

    #endregion

    #region Ctors

    private PagingResult(long totalCount, PaginationRequest pagination)
    {
        TotalCount = totalCount;
        PageNumber = pagination.PageNumber;
        PageSize = pagination.PageSize;
        HasItem = totalCount > 0;
    }

    #endregion

    #region Methods

    public static PagingResult Of(long totalCount, PaginationRequest pagination)
    {
        var result = new PagingResult(totalCount, pagination);
        if (pagination.PageSize > 0)
        {
            result.TotalPages = pagination.GetTotalPages(totalCount);
            result.HasNextPage = pagination.PageNumber < result.TotalPages;
            result.HasPreviousPage = pagination.PageNumber > 1 && pagination.PageNumber <= result.TotalPages;
        }
        return result;
    }

    #endregion
}
