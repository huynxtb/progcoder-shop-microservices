#region using

using Grpc.Core;
using MediatR;
using Order.Application.CQRS.Order.Queries;

#endregion

namespace Order.Grpc.Services;

public sealed class OrderGrpcService(ISender sender) : OrderGrpc.OrderGrpcBase
{
    #region Methods

    public override async Task<GetOrdersByMonthResponse> GetOrdersByMonth(GetOrdersByMonthRequest request, ServerCallContext context)
    {
        var query = new GetOrderByMonthQuery(request.Year, request.Month);
        var result = await sender.Send(query, context.CancellationToken);

        var response = new GetOrdersByMonthResponse();

        foreach (var orderDto in result.Items)
        {
            var order = new Order
            {
                Id = orderDto.Id.ToString(),
                TotalPrice = (double)orderDto.TotalPrice,
                FinalPrice = (double)orderDto.FinalPrice
            };

            foreach (var orderItemDto in orderDto.OrderItems)
            {
                var orderItem = new OrderItem
                {
                    Quantity = orderItemDto.Quantity,
                    Product = new Product
                    {
                        Id = orderItemDto.Product.Id.ToString(),
                        Name = orderItemDto.Product.Name,
                        Price = (double)orderItemDto.Product.Price
                    }
                };

                order.OrderItems.Add(orderItem);
            }

            response.Orders.Add(order);
        }

        return response;
    }

    #endregion
}
