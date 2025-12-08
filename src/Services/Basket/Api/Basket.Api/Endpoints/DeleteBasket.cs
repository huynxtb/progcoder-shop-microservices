
#region using

using Basket.Api.Constants;
using Basket.Application.CQRS.Basket.Commands;
using BuildingBlocks.Authentication.Extensions;

#endregion

namespace Basket.Api.Endpoints;

public sealed class DeleteBasket : ICarterModule
{
    #region Implementations

    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapDelete(ApiRoutes.Basket.DeleteBasket, HandleDeleteBasketAsync)
            .WithTags(ApiRoutes.Basket.Tags)
            .WithName(nameof(DeleteBasket))
            .Produces<ApiCreatedResponse<Guid>>(StatusCodes.Status200OK)
            .Produces(StatusCodes.Status403Forbidden)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .ProducesProblem(StatusCodes.Status404NotFound)
            .RequireAuthorization();
    }

    #endregion

    #region Methods

    private async Task<ApiCreatedResponse<Guid>> HandleDeleteBasketAsync(
        ISender sender,
        IHttpContextAccessor httpContext)
    {
        var currentUser = httpContext.GetCurrentUser();
        var command = new DeleteBasketCommand(currentUser.Id);

        await sender.Send(command);

        return new ApiCreatedResponse<Guid>(Guid.Parse(currentUser.Id));
    }

    #endregion
}
