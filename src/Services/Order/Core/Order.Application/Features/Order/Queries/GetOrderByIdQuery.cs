#region using

using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Order.Domain.Abstractions;
using Order.Application.Dtos.Orders;
using Order.Application.Models.Results;

#endregion

namespace Order.Application.Features.Order.Queries;

public sealed record GetOrderByIdQuery(Guid OrderId) : IQuery<GetOrderByIdResult>;

public sealed class GetOrderByIdQueryHandler(IUnitOfWork unitOfWork, IMapper mapper)
    : IQueryHandler<GetOrderByIdQuery, GetOrderByIdResult>
{
    #region Implementations

    public async Task<GetOrderByIdResult> Handle(GetOrderByIdQuery query, CancellationToken cancellationToken)
    {
        var order = await unitOfWork.Orders
            .GetByIdWithRelationshipAsync(query.OrderId, cancellationToken)
            ?? throw new NotFoundException(MessageCode.ResourceNotFound, query.OrderId);

        var orderDto = mapper.Map<OrderDto>(order);
        var response = new GetOrderByIdResult(orderDto);

        return response;
    }

    #endregion
}