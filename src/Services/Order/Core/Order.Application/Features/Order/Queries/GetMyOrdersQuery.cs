#region using

using AutoMapper;
using System.Security.Claims;
using Order.Application.Data;
using Order.Application.Dtos.Orders;
using Order.Application.Models.Filters;
using Order.Application.Models.Results;
using Order.Domain.Entities;
using BuildingBlocks.Abstractions.ValueObjects;
using Microsoft.EntityFrameworkCore;
using BuildingBlocks.Pagination.Extensions;

#endregion

namespace Order.Application.Features.Order.Queries;

public sealed record GetMyOrdersQuery(
    GetMyOrdersFilter Filter,
    PaginationRequest Paging,
    Actor Actor) : IQuery<GetMyOrdersResult>;

public sealed class GetMyOrdersQueryHandler(IApplicationDbContext dbContext, IMapper mapper)
    : IQueryHandler<GetMyOrdersQuery, GetMyOrdersResult>
{
    #region Implementations

    public async Task<GetMyOrdersResult> Handle(GetMyOrdersQuery query, CancellationToken cancellationToken)
    {
        var filter = query.Filter;
        var paging = query.Paging;
        var actor = query.Actor;

        var orderQuery = dbContext.Orders
            .Where(x => x.Customer.Id == Guid.Parse(actor.ToString()));

        // Apply filters
        if (!filter.SearchText.IsNullOrWhiteSpace())
        {
            var search = filter.SearchText.Trim().ToLower();
            orderQuery = orderQuery.Where(x => 
                x.OrderNo.Value.ToLower().Contains(search));
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
            .OrderByDescending(x => x.CreatedOnUtc)
            .WithPaging(paging)
            .ToListAsync(cancellationToken);

        var items = mapper.Map<List<OrderDto>>(orders);
        var response = new GetMyOrdersResult(items, totalCount, paging);

        return response;
    }

    #endregion
}