
#region using

using Catalog.Api.Constants;
using Catalog.Application.CQRS.Product.Commands;
using Microsoft.AspNetCore.Mvc;
using SourceCommon.Models.Reponses;

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
            .Produces<ResultSharedResponse<string>>(StatusCodes.Status200OK)
            .Produces(StatusCodes.Status403Forbidden)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .ProducesProblem(StatusCodes.Status404NotFound)
            .RequireAuthorization();
    }

    #endregion

    #region Methods

    private async Task<ResultSharedResponse<string>> HandleDeleteProductAsync(
        ISender sender,
        IHttpContextAccessor httpContext,
        [FromRoute] Guid productId)
    {
        var currentUser = httpContext.GetCurrentUser();
        var command = new DeleteProductCommand(productId, currentUser.Id);

        return await sender.Send(command);
    }

    #endregion
}
