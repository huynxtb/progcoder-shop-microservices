#region using

using BuildingBlocks.Authentication.Extensions;
using Catalog.Api.Constants;
using Catalog.Application.CQRS.Brand.Commands;
using Catalog.Application.Dtos.Brands;
using Common.Models.Reponses;
using Microsoft.AspNetCore.Mvc;

#endregion

namespace Catalog.Api.Endpoints;

public sealed class UpdateBrand : ICarterModule
{
    #region Implementations

    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPut(ApiRoutes.Brand.Update, HandleUpdateBrandAsync)
            .WithTags(ApiRoutes.Brand.Tags)
            .WithName(nameof(UpdateBrand))
            .Produces<ApiUpdatedResponse<Guid>>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .RequireAuthorization();
    }

    #endregion

    #region Methods

    private async Task<ApiUpdatedResponse<Guid>> HandleUpdateBrandAsync(
        ISender sender,
        IHttpContextAccessor httpContext,
        Guid brandId,
        [FromBody] UpdateBrandDto req)
    {
        var currentUser = httpContext.GetCurrentUser();
        var command = new UpdateBrandCommand(brandId, req, Actor.User(currentUser.Id));

        var result = await sender.Send(command);

        return new ApiUpdatedResponse<Guid>(result);
    }

    #endregion
}
