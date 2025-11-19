#region using

using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Order.Application.Data;
using Order.Application.Dtos.Orders;
using Order.Application.Models.Results;
using Order.Domain.Entities;

#endregion

namespace Order.Application.CQRS.Order.Queries;

public sealed record GetOrderByIdQuery(Guid OrderId) : IQuery<GetOrderByIdResult>;

public sealed class GetOrderByIdQueryHandler(IApplicationDbContext dbContext, IMapper mapper)
    : IQueryHandler<GetOrderByIdQuery, GetOrderByIdResult>
{
    #region Implementations

    public async Task<GetOrderByIdResult> Handle(GetOrderByIdQuery query, CancellationToken cancellationToken)
    {
        var order = await dbContext.Orders
            .Include(x => x.OrderItems)
            .FirstOrDefaultAsync(x => x.Id == query.OrderId, cancellationToken)
            ?? throw new NotFoundException(MessageCode.ResourceNotFound, query.OrderId);

        var orderDto = mapper.Map<OrderDto>(order);
        var response = new GetOrderByIdResult(orderDto);

        return response;
    }

    #endregion
}