#region using

using BuildingBlocks.Abstractions.ValueObjects;
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
            .Produces<Guid>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .ProducesProblem(StatusCodes.Status404NotFound)
            .RequireAuthorization();
    }

    #endregion

    #region Methods

    private async Task<Guid> HandleCreateOrderAsync(
        ISender sender,
        IHttpContextAccessor httpContext,
        [FromBody] CreateOrderDto dto)
    {
        var currentUser = httpContext.GetCurrentUser();
        var command = new CreateOrderCommand(dto, Actor.User(currentUser.Id));
        return await sender.Send(command);
    }

    #endregion
}
