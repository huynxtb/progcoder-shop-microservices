#region using

using AutoMapper;
using Order.Application.Data;
using Order.Application.Dtos.Orders;
using Order.Application.Models.Results;
using BuildingBlocks.Abstractions.ValueObjects;
using Microsoft.EntityFrameworkCore;

#endregion

namespace Order.Application.Features.Order.Queries;

public sealed record GetMyOrderByIdQuery(
    Guid OrderId,
    Actor Actor) : IQuery<GetMyOrderByIdResult>;

public sealed class GetMyOrderByIdQueryHandler(IApplicationDbContext dbContext, IMapper mapper)
    : IQueryHandler<GetMyOrderByIdQuery, GetMyOrderByIdResult>
{
    #region Implementations

    public async Task<GetMyOrderByIdResult> Handle(GetMyOrderByIdQuery query, CancellationToken cancellationToken)
    {
        var actor = query.Actor;

        var order = await dbContext.Orders
            .Where(x => x.Id == query.OrderId && x.Customer.Id == Guid.Parse(actor.ToString()))
            .FirstOrDefaultAsync(cancellationToken)
            ?? throw new NotFoundException(MessageCode.OrderNotFound);

        var orderDto = mapper.Map<OrderDto>(order);
        var response = new GetMyOrderByIdResult(orderDto);

        return response;
    }

    #endregion
}
