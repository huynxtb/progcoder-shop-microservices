#region using

using Microsoft.EntityFrameworkCore;
using Order.Application.Data;
using Order.Application.Dtos.Orders;
using Order.Application.Models.Filters;
using Order.Application.Models.Results;
using Order.Domain.Entities;

#endregion

namespace Order.Application.CQRS.Order.Queries;

public sealed record GetAllOrdersQuery(GetAllOrdersFilter Filter) : IQuery<GetAllOrdersResult>;

public sealed class GetAllOrdersQueryHandler(IApplicationDbContext dbContext)
    : IQueryHandler<GetAllOrdersQuery, GetAllOrdersResult>
{
    #region Implementations

    public async Task<GetAllOrdersResult> Handle(GetAllOrdersQuery query, CancellationToken cancellationToken)
    {
        var filter = query.Filter;
        var orderQuery = dbContext.Orders.AsQueryable();

        // Apply filters
        if (!filter.SearchText.IsNullOrWhiteSpace())
        {
            var search = filter.SearchText.Trim().ToLower();
            orderQuery = orderQuery.Where(x => 
                x.OrderNo.Value.ToLower().Contains(search) ||
                x.Customer.Name.ToLower().Contains(search) ||
                x.Customer.Email.ToLower().Contains(search));
        }

        if (filter.Ids?.Length > 0)
        {
            orderQuery = orderQuery.Where(x => filter.Ids.Contains(x.Id));
        }

        if (filter.CustomerId.HasValue)
        {
            orderQuery = orderQuery.Where(x => x.Customer.Id == filter.CustomerId.Value);
        }

        if (filter.Status.HasValue)
        {
            orderQuery = orderQuery.Where(x => x.Status == filter.Status.Value);
        }

        if (filter.FromDate.HasValue)
        {
            orderQuery = orderQuery.Where(x => x.CreatedOnUtc >= filter.FromDate.Value);
        }

        if (filter.ToDate.HasValue)
        {
            orderQuery = orderQuery.Where(x => x.CreatedOnUtc <= filter.ToDate.Value);
        }

        var orders = await orderQuery
            .Include(x => x.OrderItems)
            .OrderByDescending(x => x.CreatedOnUtc)
            .ToListAsync(cancellationToken);

        var items = orders.Adapt<List<OrderDto>>();
        var response = new GetAllOrdersResult(items);

        return response;
    }

    #endregion
}