#region using

using Order.Application.Models.Results;

#endregion

namespace Order.Application.CQRS.Order.Queries;

public record GetOrdersQuery(PaginationRequest Paging) : IQuery<GetOrdersResult>;