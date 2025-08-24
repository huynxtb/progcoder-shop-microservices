namespace BuildingBlocks.Pagination;

public sealed class PaginatedResult<T>
    (int pageNumber, int pageSize, long count, List<T> items, bool hasItem = false) 
    where T : class
{
    #region Fields, Properties and Indexers

    public List<T> Items { get; } = items;

    public int PageNumber { get; } = pageNumber;

    public int PageSize { get; } = pageSize;

    public long Count { get; } = count;

    public bool HasItem { get; } = hasItem;

    #endregion

}
