#region using

using AutoMapper;
using Order.Domain.Abstractions;
using Order.Application.Dtos.Orders;
using Order.Application.Models.Filters;
using Order.Application.Models.Results;

#endregion

namespace Order.Application.Features.Order.Queries;

public sealed record GetAllMyOrdersQuery(
    GetMyOrdersFilter Filter,
    Actor Actor) : IQuery<GetAllMyOrdersResult>;

public sealed class GetAllMyOrdersQueryHandler(IUnitOfWork unitOfWork, IMapper mapper)
    : IQueryHandler<GetAllMyOrdersQuery, GetAllMyOrdersResult>
{
    #region Implementations

    public async Task<GetAllMyOrdersResult> Handle(GetAllMyOrdersQuery query, CancellationToken cancellationToken)
    {
        var filter = query.Filter;
        var actor = query.Actor;

        var orders = await unitOfWork.Orders
            .SearchWithRelationshipAsync(x =>
                x.Customer.Id == Guid.Parse(actor.ToString()) &&
                (filter.SearchText.IsNullOrWhiteSpace() || x.OrderNo.Value.ToLower().Contains(filter.SearchText!)) &&
                (!filter.FromDate.HasValue || x.CreatedOnUtc >= filter.FromDate.Value) &&
                (!filter.ToDate.HasValue || x.CreatedOnUtc <= filter.ToDate.Value),
                cancellationToken);

        var items = mapper.Map<List<OrderDto>>(orders);
        var response = new GetAllMyOrdersResult(items);

        return response;
    }

    #endregion
}
