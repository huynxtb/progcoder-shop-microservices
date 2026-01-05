#region using

using BuildingBlocks.Abstractions.ValueObjects;
using BuildingBlocks.Authentication.Extensions;
using Catalog.Api.Constants;
using Catalog.Application.Features.Product.Commands;
using Common.Models.Reponses;
using Microsoft.AspNetCore.Mvc;

#endregion

namespace Catalog.Api.Endpoints;

public sealed class PublishProduct : ICarterModule
{
    #region Implementations

    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost(ApiRoutes.Product.Publish, HandlePublishProductAsync)
            .WithTags(ApiRoutes.Product.Tags)
            .WithName(nameof(PublishProduct))
            .Produces<ApiUpdatedResponse<Guid>>(StatusCodes.Status200OK)
            .Produces(StatusCodes.Status403Forbidden)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .ProducesProblem(StatusCodes.Status404NotFound)
            .RequireAuthorization();
    }

    #endregion

    #region Methods

    private async Task<ApiUpdatedResponse<Guid>> HandlePublishProductAsync(
        ISender sender,
        IHttpContextAccessor httpContext,
        [FromRoute] Guid productId)
    {
        var currentUser = httpContext.GetCurrentUser();
        var command = new PublishProductCommand(productId, Actor.User(currentUser.Email));
        var result = await sender.Send(command);

        return new ApiUpdatedResponse<Guid>(result);
    }

    #endregion
}
