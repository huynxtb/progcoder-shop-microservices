
#region using

using Catalog.Api.Constants;
using Catalog.Application.Features.Product.Commands;
using Microsoft.AspNetCore.Mvc;

#endregion

namespace Catalog.Api.Endpoints;

public sealed class DeleteProduct : ICarterModule
{
    #region Implementations

    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapDelete(ApiRoutes.Product.Delete, HandleDeleteProductAsync)
            .WithTags(ApiRoutes.Product.Tags)
            .WithName(nameof(DeleteProduct))
            .Produces<ApiDeletedResponse<Guid>>(StatusCodes.Status200OK)
            .Produces(StatusCodes.Status403Forbidden)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .ProducesProblem(StatusCodes.Status404NotFound)
            .RequireAuthorization();
    }

    #endregion

    #region Methods

    private async Task<ApiDeletedResponse<Guid>> HandleDeleteProductAsync(
        ISender sender,
        [FromRoute] Guid productId)
    {
        var command = new DeleteProductCommand(productId);

        await sender.Send(command);

        return new ApiDeletedResponse<Guid>(productId);
    }

    #endregion
}
