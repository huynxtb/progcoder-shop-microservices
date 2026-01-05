#region using

using Catalog.Api.Constants;
using Catalog.Application.Features.Brand.Commands;

#endregion

namespace Catalog.Api.Endpoints;

public sealed class DeleteBrand : ICarterModule
{
    #region Implementations

    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapDelete(ApiRoutes.Brand.Delete, HandleDeleteBrandAsync)
            .WithTags(ApiRoutes.Brand.Tags)
            .WithName(nameof(DeleteBrand))
            .Produces<ApiDeletedResponse<Guid>>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .RequireAuthorization();
    }

    #endregion

    #region Methods

    private async Task<ApiDeletedResponse<Guid>> HandleDeleteBrandAsync(
        ISender sender,
        Guid brandId)
    {
        var command = new DeleteBrandCommand(brandId);

        await sender.Send(command);

        return new ApiDeletedResponse<Guid>(brandId);
    }

    #endregion
}
