#region using

using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Order.Application.Data;
using Order.Application.Dtos.Orders;
using Order.Application.Models.Results;

#endregion

namespace Order.Application.CQRS.Order.Queries;

public sealed record GetOrderByMonthQuery(int Year, int Month) : IQuery<GetOrderByMonthResult>;

public sealed class GetOrderByMonthQueryHandler(IApplicationDbContext dbContext, IMapper mapper)
    : IQueryHandler<GetOrderByMonthQuery, GetOrderByMonthResult>
{
    #region Implementations

    public async Task<GetOrderByMonthResult> Handle(GetOrderByMonthQuery query, CancellationToken cancellationToken)
    {
        var orders = await dbContext.Orders
            .Include(x => x.OrderItems)
            .Where(x => x.CreatedOnUtc.Year == query.Year && x.CreatedOnUtc.Month == query.Month)
            .ToListAsync(cancellationToken);

        var orderDtos = mapper.Map<List<OrderDto>>(orders);
        var response = new GetOrderByMonthResult(orderDtos);

        return response;
    }

    #endregion
}