#region using

using AutoMapper;
using Order.Application.Data;
using Order.Application.Dtos.Orders;
using Order.Application.Models.Filters;
using Order.Application.Models.Results;
using Microsoft.EntityFrameworkCore;

#endregion

namespace Order.Application.Features.Order.Queries;

public sealed record GetAllMyOrdersQuery(
    GetMyOrdersFilter Filter,
    Actor Actor) : IQuery<GetAllMyOrdersResult>;

public sealed class GetAllMyOrdersQueryHandler(IApplicationDbContext dbContext, IMapper mapper)
    : IQueryHandler<GetAllMyOrdersQuery, GetAllMyOrdersResult>
{
    #region Implementations

    public async Task<GetAllMyOrdersResult> Handle(GetAllMyOrdersQuery query, CancellationToken cancellationToken)
    {
        var filter = query.Filter;
        var actor = query.Actor;

        var orderQuery = dbContext.Orders
            .Where(x => x.Customer.Id == Guid.Parse(actor.ToString()));

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

        var orders = await orderQuery
            .OrderByDescending(x => x.CreatedOnUtc)
            .ToListAsync(cancellationToken);

        var items = mapper.Map<List<OrderDto>>(orders);
        var response = new GetAllMyOrdersResult(items);

        return response;
    }

    #endregion
}
