#region using

using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Order.Application.Data;
using Order.Application.Dtos.Orders;
using Order.Application.Models.Results;

#endregion

namespace Order.Application.CQRS.Order.Queries;

public sealed record GetOrderByOrderNoQuery(string OrderNo) : IQuery<GetOrderByOrderNoResult>;

public sealed class GetOrderByOrderNoQueryHandler(IApplicationDbContext dbContext, IMapper mapper)
    : IQueryHandler<GetOrderByOrderNoQuery, GetOrderByOrderNoResult>
{
    #region Implementations

    public async Task<GetOrderByOrderNoResult> Handle(GetOrderByOrderNoQuery query, CancellationToken cancellationToken)
    {
        var order = await dbContext.Orders
            .Include(x => x.OrderItems)
            .FirstOrDefaultAsync(x => x.OrderNo.Value == query.OrderNo, cancellationToken)
            ?? throw new NotFoundException(MessageCode.ResourceNotFound, query.OrderNo);

        var orderDto = mapper.Map<OrderDto>(order);
        var response = new GetOrderByOrderNoResult(orderDto);

        return response;
    }

    #endregion
}