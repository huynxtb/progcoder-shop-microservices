#region using

using BuildingBlocks.Authentication.Extensions;
using Catalog.Api.Constants;
using Catalog.Application.CQRS.Category.Commands;
using Catalog.Application.Dtos.Categories;
using Microsoft.AspNetCore.Mvc;

#endregion

namespace Catalog.Api.Endpoints;

public sealed class CreateCategory : ICarterModule
{
    #region Implementations

    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost(ApiRoutes.Category.Create, HandleCreateCategoryAsync)
            .WithTags(ApiRoutes.Category.Tags)
            .WithName(nameof(CreateCategory))
            .Produces<ApiCreatedResponse<Guid>>(StatusCodes.Status201Created)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .RequireAuthorization();
    }

    #endregion

    #region Methods

    private async Task<ApiCreatedResponse<Guid>> HandleCreateCategoryAsync(
        ISender sender,
        IHttpContextAccessor httpContext,
        [FromBody] CreateCategoryDto req)
    {
        var currentUser = httpContext.GetCurrentUser();
        var command = new CreateCategoryCommand(req, Actor.User(currentUser.Email));

        var result = await sender.Send(command);

        return new ApiCreatedResponse<Guid>(result);
    }

    #endregion
}
