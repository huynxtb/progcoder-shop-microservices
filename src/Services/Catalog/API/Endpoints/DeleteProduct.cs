
#region using

using Catalog.Api.Constants;
using Catalog.Application.CQRS.Product.Commands;
using Microsoft.AspNetCore.Mvc;
using Common.Models.Reponses;

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
            .Produces<Unit>(StatusCodes.Status200OK)
            .Produces(StatusCodes.Status403Forbidden)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .ProducesProblem(StatusCodes.Status404NotFound)
            .RequireAuthorization();
    }

    #endregion

    #region Methods

    private async Task<Unit> HandleDeleteProductAsync(
        ISender sender,
        [FromRoute] Guid productId)
    {
        var command = new DeleteProductCommand(productId);
        return await sender.Send(command);
    }

    #endregion
}
