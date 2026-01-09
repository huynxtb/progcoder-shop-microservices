#region using

using AutoMapper;
using Order.Domain.Abstractions;
using Order.Application.Dtos.Orders;
using Order.Application.Models.Results;

#endregion

namespace Order.Application.Features.Order.Queries;

public sealed record GetOrderByMonthQuery(int Year, int Month) : IQuery<GetOrderByMonthResult>;

public sealed class GetOrderByMonthQueryHandler(IUnitOfWork unitOfWork, IMapper mapper)
    : IQueryHandler<GetOrderByMonthQuery, GetOrderByMonthResult>
{
    #region Implementations

    public async Task<GetOrderByMonthResult> Handle(GetOrderByMonthQuery query, CancellationToken cancellationToken)
    {
        // Fetch orders for the specified month using repository
        var orders = await unitOfWork.Orders
            .SearchWithRelationshipAsync(
                x => x.CreatedOnUtc.Year == query.Year &&
                     x.CreatedOnUtc.Month == query.Month &&
                     x.Status == Domain.Enums.OrderStatus.Delivered,
                cancellationToken);

        // Group orders by day
        var ordersByDay = orders
            .GroupBy(x => x.CreatedOnUtc.Day)
            .ToDictionary(g => g.Key, g => g.ToList());

        // Get total days in the queried month
        var daysInMonth = DateTime.DaysInMonth(query.Year, query.Month);

        // Create result for all days in the month
        var allOrderDtos = new List<OrderDto>();

        for (int day = 1; day <= daysInMonth; day++)
        {
            if (ordersByDay.TryGetValue(day, out var dayOrders))
            {
                // If there are orders for this day, map them
                var orderDtos = mapper.Map<List<OrderDto>>(dayOrders);
                allOrderDtos.AddRange(orderDtos);
            }
            else
            {
                // If no orders for this day, add an empty OrderDto with the date
                var emptyOrder = new OrderDto
                {
                    Id = Guid.Empty,
                    CreatedOnUtc = new DateTimeOffset(query.Year, query.Month, day, 0, 0, 0, TimeSpan.Zero),
                    TotalPrice = 0,
                    FinalPrice = 0,
                    OrderItems = new List<OrderItemDto>()
                };
                allOrderDtos.Add(emptyOrder);
            }
        }

        var response = new GetOrderByMonthResult(allOrderDtos);

        return response;
    }

    #endregion
}