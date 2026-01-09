#region using

using AutoMapper;
using Order.Domain.Abstractions;
using Order.Application.Dtos.Orders;
using Order.Application.Models.Filters;
using Order.Application.Models.Results;

#endregion

namespace Order.Application.Features.Order.Queries;

public sealed record GetMyOrdersQuery(
    GetMyOrdersFilter Filter,
    PaginationRequest Paging,
    Actor Actor) : IQuery<GetMyOrdersResult>;

public sealed class GetMyOrdersQueryHandler(IUnitOfWork unitOfWork, IMapper mapper)
    : IQueryHandler<GetMyOrdersQuery, GetMyOrdersResult>
{
    #region Implementations

    public async Task<GetMyOrdersResult> Handle(GetMyOrdersQuery query, CancellationToken cancellationToken)
    {
        var filter = query.Filter;
        var paging = query.Paging;
        var actor = query.Actor;

        // Apply all filters in the predicate expression
        var orders = await unitOfWork.Orders
            .SearchWithRelationshipAsync(x =>
                x.Customer.Id == Guid.Parse(actor.ToString()) &&
                (filter.SearchText.IsNullOrWhiteSpace() || x.OrderNo.Value.ToLower().Contains(filter.SearchText.Trim().ToLower())) &&
                (!filter.FromDate.HasValue || x.CreatedOnUtc >= filter.FromDate.Value) &&
                (!filter.ToDate.HasValue || x.CreatedOnUtc <= filter.ToDate.Value),
                paging,
                cancellationToken);

        var totalCount = orders.Count;
        var items = mapper.Map<List<OrderDto>>(orders);
        var response = new GetMyOrdersResult(items, totalCount, paging);

        return response;
    }

    #endregion
}