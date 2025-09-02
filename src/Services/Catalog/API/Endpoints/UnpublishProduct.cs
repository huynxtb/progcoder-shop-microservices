
#region using

using BuildingBlocks.Abstractions.ValueObjects;
using Catalog.Api.Constants;
using Catalog.Application.CQRS.Product.Commands;
using Common.Models.Reponses;
using Microsoft.AspNetCore.Mvc;

#endregion

namespace Catalog.Api.Endpoints;

public sealed class UnpublishProduct : ICarterModule
{
    #region Implementations

    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost(ApiRoutes.Product.Unpublish, HandleUnpublishProductAsync)
            .WithTags(ApiRoutes.Product.Tags)
            .WithName(nameof(UnpublishProduct))
            .Produces<ResultSharedResponse<string>>(StatusCodes.Status200OK)
            .Produces(StatusCodes.Status403Forbidden)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .ProducesProblem(StatusCodes.Status404NotFound)
            .RequireAuthorization();
    }

    #endregion

    #region Methods

    private async Task<ResultSharedResponse<string>> HandleUnpublishProductAsync(
        ISender sender,
        IHttpContextAccessor httpContext,
        [FromRoute] Guid productId)
    {
        var currentUser = httpContext.GetCurrentUser();
        var command = new UnpublishProductCommand(productId, Actor.User(currentUser.Id));
        return await sender.Send(command);
    }

    #endregion
}
