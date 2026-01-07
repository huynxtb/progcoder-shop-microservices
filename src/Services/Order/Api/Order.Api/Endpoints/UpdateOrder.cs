#region using

using BuildingBlocks.Authentication.Extensions;
using Common.Models.Reponses;
using Microsoft.AspNetCore.Mvc;
using Order.Api.Constants;
using Order.Application.Features.Order.Commands;
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
            .Produces<ApiUpdatedResponse<Guid>>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .RequireAuthorization();
    }

    #endregion

    #region Methods

    private async Task<ApiUpdatedResponse<Guid>> HandleUpdateOrderAsync(
        ISender sender,
        IHttpContextAccessor httpContext,
        [FromRoute] Guid orderId,
        [FromBody] CreateOrUpdateOrderDto dto)
    {
        var currentUser = httpContext.GetCurrentUser();
        var command = new UpdateOrderCommand(orderId, dto, Actor.User(currentUser.Email));
        var result = await sender.Send(command);

        return new ApiUpdatedResponse<Guid>(result);
    }

    #endregion
}
