#region using

using BuildingBlocks.Authentication.Extensions;
using Catalog.Api.Constants;
using Catalog.Application.Features.Category.Commands;
using Catalog.Application.Dtos.Categories;
using Microsoft.AspNetCore.Mvc;

#endregion

namespace Catalog.Api.Endpoints;

public sealed class UpdateCategory : ICarterModule
{
    #region Implementations

    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPut(ApiRoutes.Category.Update, HandleUpdateCategoryAsync)
            .WithTags(ApiRoutes.Category.Tags)
            .WithName(nameof(UpdateCategory))
            .Produces<ApiUpdatedResponse<Guid>>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .RequireAuthorization();
    }

    #endregion

    #region Methods

    private async Task<ApiUpdatedResponse<Guid>> HandleUpdateCategoryAsync(
        ISender sender,
        IHttpContextAccessor httpContext,
        Guid categoryId,
        [FromBody] UpdateCategoryDto req)
    {
        var currentUser = httpContext.GetCurrentUser();
        var command = new UpdateCategoryCommand(categoryId, req, Actor.User(currentUser.Email));

        var result = await sender.Send(command);

        return new ApiUpdatedResponse<Guid>(result);
    }

    #endregion
}
