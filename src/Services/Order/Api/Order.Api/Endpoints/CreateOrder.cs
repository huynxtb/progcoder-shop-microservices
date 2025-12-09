#region using

using BuildingBlocks.Abstractions.ValueObjects;
using BuildingBlocks.Authentication.Extensions;
using Common.Models.Reponses;
using Microsoft.AspNetCore.Mvc;
using Order.Api.Constants;
using Order.Application.CQRS.Order.Commands;
using Order.Application.Dtos.Orders;

#endregion

namespace Order.Api.Endpoints;

public sealed class CreateOrder : ICarterModule
{
    #region Implementations

    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost(ApiRoutes.Order.Create, HandleCreateOrderAsync)
            .WithTags(ApiRoutes.Order.Tags)
            .WithName(nameof(CreateOrder))
            .Produces<ApiCreatedResponse<Guid>>(StatusCodes.Status201Created)
            .Produces(StatusCodes.Status401Unauthorized)
            .Produces(StatusCodes.Status403Forbidden)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .ProducesProblem(StatusCodes.Status404NotFound)
            .ProducesProblem(StatusCodes.Status422UnprocessableEntity)
            .ProducesProblem(StatusCodes.Status500InternalServerError)
            .RequireAuthorization();
    }

    #endregion

    #region Methods

    private async Task<ApiCreatedResponse<Guid>> HandleCreateOrderAsync(
        ISender sender,
        IHttpContextAccessor httpContext,
        [FromBody] CreateOrUpdateOrderDto dto)
    {
        var currentUser = httpContext.GetCurrentUser();
        var command = new CreateOrderCommand(dto, Actor.User(currentUser.Email));
        var result = await sender.Send(command);

        return new ApiCreatedResponse<Guid>(result);
    }

    #endregion
}
