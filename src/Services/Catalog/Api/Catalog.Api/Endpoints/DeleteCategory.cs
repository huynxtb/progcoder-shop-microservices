#region using

using BuildingBlocks.Authentication.Extensions;
using Catalog.Api.Constants;
using Catalog.Application.Features.Category.Commands;
using Common.Models.Reponses;

#endregion

namespace Catalog.Api.Endpoints;

public sealed class DeleteCategory : ICarterModule
{
    #region Implementations

    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapDelete(ApiRoutes.Category.Delete, HandleDeleteCategoryAsync)
            .WithTags(ApiRoutes.Category.Tags)
            .WithName(nameof(DeleteCategory))
            .Produces<ApiDeletedResponse<Guid>>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .RequireAuthorization();
    }

    #endregion

    #region Methods

    private async Task<ApiDeletedResponse<Guid>> HandleDeleteCategoryAsync(
        ISender sender,
        IHttpContextAccessor httpContext,
        Guid categoryId)
    {
        var command = new DeleteCategoryCommand(categoryId);

        await sender.Send(command);

        return new ApiDeletedResponse<Guid>(categoryId);
    }

    #endregion
}
