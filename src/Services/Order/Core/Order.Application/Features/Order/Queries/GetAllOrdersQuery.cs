#region using

using AutoMapper;
using Order.Domain.Abstractions;
using Order.Application.Dtos.Orders;
using Order.Application.Models.Filters;
using Order.Application.Models.Results;

#endregion

namespace Order.Application.Features.Order.Queries;

public sealed record GetAllOrdersQuery(GetAllOrdersFilter Filter) : IQuery<GetAllOrdersResult>;

public sealed class GetAllOrdersQueryHandler(IUnitOfWork unitOfWork, IMapper mapper)
    : IQueryHandler<GetAllOrdersQuery, GetAllOrdersResult>
{
    #region Implementations

    public async Task<GetAllOrdersResult> Handle(GetAllOrdersQuery query, CancellationToken cancellationToken)
    {
        var filter = query.Filter;

        var orders = await unitOfWork.Orders
            .SearchWithRelationshipAsync(x =>
                (filter.Ids == null || filter.Ids.Length > 0 || filter.Ids.Contains(x.Id)) &&
                (!filter.CustomerId.HasValue || x.Customer.Id == filter.CustomerId.Value) &&
                (!filter.Status.HasValue || x.Status == filter.Status.Value) &&
                (filter.SearchText.IsNullOrWhiteSpace() || x.OrderNo.Value.ToLower().Contains(filter.SearchText!)) &&
                (!filter.FromDate.HasValue || x.CreatedOnUtc >= filter.FromDate.Value) &&
                (!filter.ToDate.HasValue || x.CreatedOnUtc <= filter.ToDate.Value),
                cancellationToken);

        var items = mapper.Map<List<OrderDto>>(orders);
        var response = new GetAllOrdersResult(items);

        return response;
    }

    #endregion
}