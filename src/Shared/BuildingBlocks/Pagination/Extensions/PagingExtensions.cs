#region using

using Common.Models;
using MongoDB.Driver;

#endregion

namespace BuildingBlocks.Pagination.Extensions;

public static class PagingExtensions
{
    #region Methods

    public static IFindFluent<TDocument, TProjection> WithPaging<TDocument, TProjection>(
        this IFindFluent<TDocument, TProjection> fluent,
        PaginationRequest paging)
    {
        if (fluent is null) throw new ArgumentNullException(nameof(fluent));
        if (paging is null) throw new ArgumentNullException(nameof(paging));

        var (pageNumber, pageSize, skip) = Normalize(paging);
        return fluent.Skip(skip).Limit(pageSize);
    }

    public static IQueryable<T> WithPaging<T>(
        this IQueryable<T> query,
        PaginationRequest paging)
    {
        if (query is null) throw new ArgumentNullException(nameof(query));
        if (paging is null) throw new ArgumentNullException(nameof(paging));

        var (pageNumber, pageSize, skip) = Normalize(paging);
        return query.Skip(skip).Take(pageSize);
    }

    public static int GetTotalPages(this PaginationRequest paging, long totalCount)
    {
        if (paging.PageSize <= 0) throw new ArgumentOutOfRangeException(nameof(paging.PageSize), "Page size must be greater than zero.");
        return (int)Math.Ceiling(totalCount / (double)paging.PageSize);
    }

    private static (int pageNumber, int pageSize, int skip) Normalize(PaginationRequest paging)
    {
        var pageNumber = paging.PageNumber <= 0 ? 1 : paging.PageNumber;
        var pageSize = paging.PageSize <= 0 ? 10 : paging.PageSize;

        checked
        {
            var skip = (pageNumber - 1) * pageSize;
            return (pageNumber, pageSize, skip);
        }
    }

    #endregion
}
