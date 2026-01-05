
#region using

using Basket.Api.Constants;
using Basket.Application.Features.Basket.Commands;
using BuildingBlocks.Authentication.Extensions;
using Common.Models.Reponses;

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
            .Produces<ApiDeletedResponse<Guid>>(StatusCodes.Status200OK)
            .Produces(StatusCodes.Status403Forbidden)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .ProducesProblem(StatusCodes.Status404NotFound)
            .RequireAuthorization();
    }

    #endregion

    #region Methods

    private async Task<ApiDeletedResponse<Guid>> HandleDeleteBasketAsync(
        ISender sender,
        IHttpContextAccessor httpContext)
    {
        var currentUser = httpContext.GetCurrentUser();
        var command = new DeleteBasketCommand(currentUser.Id);

        await sender.Send(command);

        return new ApiDeletedResponse<Guid>(Guid.Parse(currentUser.Id));
    }

    #endregion
}
