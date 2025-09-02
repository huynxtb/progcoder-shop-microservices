#region using

using Catalog.Api.Constants;
using Catalog.Application.CQRS.Product.Queries;
using Catalog.Application.Models.Responses;
using Microsoft.AspNetCore.Mvc;
using Common.Models.Reponses;

#endregion

namespace Catalog.Api.Endpoints;

public sealed class GetProductById : ICarterModule
{
    #region Implementations

    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet(ApiRoutes.Product.GetProductById, HandleGetProductByIdAsync)
            .WithTags(ApiRoutes.Product.Tags)
            .WithName(nameof(GetProductById))
            .Produces<ResultSharedResponse<GetProductByIdResponse>>(StatusCodes.Status200OK)
            .Produces(StatusCodes.Status403Forbidden)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .ProducesProblem(StatusCodes.Status404NotFound)
            .RequireAuthorization();
    }

    #endregion

    #region Methods

    private async Task<ResultSharedResponse<GetProductByIdResponse>> HandleGetProductByIdAsync(
        ISender sender,
        [FromRoute] Guid productId)
    {
        var query = new GetProductByIdQuery(productId);

        return await sender.Send(query);
    }

    #endregion
}
