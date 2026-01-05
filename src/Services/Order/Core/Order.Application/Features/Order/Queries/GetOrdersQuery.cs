#region using

using AutoMapper;
using BuildingBlocks.Pagination.Extensions;
using Microsoft.EntityFrameworkCore;
using Order.Application.Data;
using Order.Application.Dtos.Orders;
using Order.Application.Models.Filters;
using Order.Application.Models.Results;
using Order.Domain.Entities;

#endregion

namespace Order.Application.Features.Order.Queries;

public sealed record GetOrdersQuery(
    GetOrdersFilter Filter,
    PaginationRequest Paging) : IQuery<GetOrdersResult>;

public sealed class GetOrdersQueryHandler(IApplicationDbContext dbContext, IMapper mapper)
    : IQueryHandler<GetOrdersQuery, GetOrdersResult>
{
    #region Implementations

    public async Task<GetOrdersResult> Handle(GetOrdersQuery query, CancellationToken cancellationToken)
    {
        var filter = query.Filter;
        var paging = query.Paging;
        var orderQuery = dbContext.Orders.AsQueryable();

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

        var totalCount = await orderQuery.CountAsync(cancellationToken);
        var orders = await orderQuery
            .Include(x => x.OrderItems)
            .OrderByDescending(x => x.CreatedOnUtc)
            .WithPaging(paging)
            .ToListAsync(cancellationToken);

        var items = mapper.Map<List<OrderDto>>(orders);
        var response = new GetOrdersResult(items, totalCount, paging);

        return response;
    }

    #endregion
}