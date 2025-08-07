#region using

using System.Linq.Expressions;

#endregion

namespace SourceCommon.Extensions;

public static class QueryableExtension
{
    #region Methods

    public static IQueryable<T> WhereIf<T>(this IQueryable<T> query,
        bool condition,
        Expression<Func<T, bool>> predicate)
    {
        if (!condition)
        {
            return query;
        }

        return query.Where(predicate);
    }

    public static IQueryable<T> TakeIf<T, TKey>(this IQueryable<T> query,
        Expression<Func<T, TKey>> orderBy, bool condition, int limit, bool orderByDescending = true)
    {
        query = (orderByDescending ? query.OrderByDescending(orderBy) : query.OrderBy(orderBy));
        if (!condition)
        {
            return query;
        }

        return query.Take(limit);
    }

    public static IQueryable<T> PageBy<T, TKey>(this IQueryable<T> query,
        Expression<Func<T, TKey>> orderBy, int page, int pageSize, bool orderByDescending = true)
    {
        if (query == null)
        {
            throw new ArgumentNullException("query");
        }

        if (page <= 0)
        {
            page = 1;
        }

        query = (orderByDescending ? query.OrderByDescending(orderBy) : query.OrderBy(orderBy));
        return query.Skip((page - 1) * pageSize).Take(pageSize);
    }

    #endregion
}
