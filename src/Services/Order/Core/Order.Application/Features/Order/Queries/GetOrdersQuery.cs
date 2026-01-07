#region using

using AutoMapper;
using BuildingBlocks.Pagination.Extensions;
using Microsoft.EntityFrameworkCore;
using Order.Domain.Abstractions;
using Order.Application.Dtos.Orders;
using Order.Application.Models.Filters;
using Order.Application.Models.Results;
using Order.Domain.Entities;
using System.Linq.Expressions;

#endregion

namespace Order.Application.Features.Order.Queries;

public sealed record GetOrdersQuery(
    GetOrdersFilter Filter,
    PaginationRequest Paging) : IQuery<GetOrdersResult>;

public sealed class GetOrdersQueryHandler(IUnitOfWork unitOfWork, IMapper mapper)
    : IQueryHandler<GetOrdersQuery, GetOrdersResult>
{
    #region Implementations

    public async Task<GetOrdersResult> Handle(GetOrdersQuery query, CancellationToken cancellationToken)
    {
        var filter = query.Filter;
        var paging = query.Paging;
        var predicate = BuildFilterPredicate(filter);

        var orders = await unitOfWork.Orders
            .SearchWithRelationshipAsync(predicate, paging, cancellationToken);

        var totalCount = await unitOfWork.Orders.CountAsync(predicate, cancellationToken);

        var items = mapper.Map<List<OrderDto>>(orders);
        var response = new GetOrdersResult(items, totalCount, paging);

        return response;
    }

    #endregion

    #region Helper Methods

    private static Expression<Func<OrderEntity, bool>> BuildFilterPredicate(GetOrdersFilter filter)
    {
        return x =>
            (filter.Ids == null || filter.Ids.Length == 0 || filter.Ids.Contains(x.Id)) &&
            (!filter.CustomerId.HasValue || x.Customer.Id == filter.CustomerId.Value) &&
            (!filter.Status.HasValue || x.Status == filter.Status.Value) &&
            (filter.SearchText.IsNullOrWhiteSpace() || x.OrderNo.Value.ToLower().Contains(filter.SearchText.Trim().ToLower())) &&
            (!filter.FromDate.HasValue || x.CreatedOnUtc >= filter.FromDate.Value) &&
            (!filter.ToDate.HasValue || x.CreatedOnUtc <= filter.ToDate.Value);
    }

    #endregion
}