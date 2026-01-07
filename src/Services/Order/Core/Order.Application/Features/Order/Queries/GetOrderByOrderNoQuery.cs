#region using

using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Order.Domain.Abstractions;
using Order.Application.Dtos.Orders;
using Order.Application.Models.Results;

#endregion

namespace Order.Application.Features.Order.Queries;

public sealed record GetOrderByOrderNoQuery(string OrderNo) : IQuery<GetOrderByOrderNoResult>;

public sealed class GetOrderByOrderNoQueryHandler(IUnitOfWork unitOfWork, IMapper mapper)
    : IQueryHandler<GetOrderByOrderNoQuery, GetOrderByOrderNoResult>
{
    #region Implementations

    public async Task<GetOrderByOrderNoResult> Handle(GetOrderByOrderNoQuery query, CancellationToken cancellationToken)
    {
        var order = await unitOfWork.Orders
            .GetByOrderNoAsync(query.OrderNo, cancellationToken)
            ?? throw new NotFoundException(MessageCode.ResourceNotFound, query.OrderNo);

        var orderDto = mapper.Map<OrderDto>(order);
        var response = new GetOrderByOrderNoResult(orderDto);

        return response;
    }

    #endregion
}