#region using

using AutoMapper;
using Order.Domain.Abstractions;
using Order.Application.Dtos.Orders;
using Order.Application.Models.Results;
using Microsoft.EntityFrameworkCore;

#endregion

namespace Order.Application.Features.Order.Queries;

public sealed record GetMyOrderByIdQuery(
    Guid OrderId,
    Actor Actor) : IQuery<GetMyOrderByIdResult>;

public sealed class GetMyOrderByIdQueryHandler(IUnitOfWork unitOfWork, IMapper mapper)
    : IQueryHandler<GetMyOrderByIdQuery, GetMyOrderByIdResult>
{
    #region Implementations

    public async Task<GetMyOrderByIdResult> Handle(GetMyOrderByIdQuery query, CancellationToken cancellationToken)
    {
        var actor = query.Actor;

        var order = await unitOfWork.Orders
            .FirstOrDefaultAsync(x => x.Id == query.OrderId && x.Customer.Id == Guid.Parse(actor.ToString()), cancellationToken)
            ?? throw new NotFoundException(MessageCode.OrderNotFound);

        var orderDto = mapper.Map<OrderDto>(order);
        var response = new GetMyOrderByIdResult(orderDto);

        return response;
    }

    #endregion
}
