#region using

using BuildingBlocks.Authentication.Extensions;
using Microsoft.AspNetCore.Mvc;
using Order.Api.Constants;
using Order.Application.CQRS.Order.Commands;
using Order.Application.Dtos.Orders;

#endregion

namespace Order.Api.Endpoints;

public class UpdateOrder : ICarterModule
{
    #region Implementations

    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPut(ApiRoutes.Order.Update, HandleUpdateOrderAsync)
            .WithTags(ApiRoutes.Order.Tags)
            .WithName(nameof(UpdateOrder))
            .Produces<Guid>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .RequireAuthorization();
    }

    #endregion

    #region Methods

    private async Task<Guid> HandleUpdateOrderAsync(
        ISender sender,
        IHttpContextAccessor httpContext,
        [FromRoute] Guid orderId,
        [FromBody] CreateOrUpdateOrderDto dto)
    {
        var currentUser = httpContext.GetCurrentUser();
        var command = new UpdateOrderCommand(orderId, dto, Actor.User(currentUser.Email));
        return await sender.Send(command);
    }

    #endregion
}
