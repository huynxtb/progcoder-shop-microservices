#region using

using BuildingBlocks.Authentication.Extensions;
using Catalog.Api.Constants;
using Catalog.Application.CQRS.Brand.Commands;
using Catalog.Application.Dtos.Brands;
using Microsoft.AspNetCore.Mvc;

#endregion

namespace Catalog.Api.Endpoints;

public sealed class CreateBrand : ICarterModule
{
    #region Implementations

    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost(ApiRoutes.Brand.Create, HandleCreateBrandAsync)
            .WithTags(ApiRoutes.Brand.Tags)
            .WithName(nameof(CreateBrand))
            .Produces<ApiCreatedResponse<Guid>>(StatusCodes.Status201Created)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .RequireAuthorization();
    }

    #endregion

    #region Methods

    private async Task<ApiCreatedResponse<Guid>> HandleCreateBrandAsync(
        ISender sender,
        IHttpContextAccessor httpContext,
        [FromBody] CreateBrandDto req)
    {
        var currentUser = httpContext.GetCurrentUser();
        var command = new CreateBrandCommand(req, Actor.User(currentUser.Email));

        var result = await sender.Send(command);

        return new ApiCreatedResponse<Guid>(result);
    }

    #endregion
}
