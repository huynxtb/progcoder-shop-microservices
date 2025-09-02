#region using

using Catalog.Api.Constants;
using Catalog.Application.CQRS.Product.Queries;
using Catalog.Application.Models.Responses;
using Microsoft.AspNetCore.Mvc;
using Common.Models.Reponses;

#endregion

namespace Catalog.Api.Endpoints;

public sealed class GetPublishProductById : ICarterModule
{
    #region Implementations

    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet(ApiRoutes.Product.GetPublishProductById, HandleGetPublishProductByIdAsync)
            .WithTags(ApiRoutes.Product.Tags)
            .WithName(nameof(GetPublishProductById))
            .Produces<ResultSharedResponse<GetPublishProductByIdResponse>>(StatusCodes.Status200OK)
            .Produces(StatusCodes.Status403Forbidden)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .ProducesProblem(StatusCodes.Status404NotFound);
    }

    #endregion

    #region Methods

    private async Task<ResultSharedResponse<GetPublishProductByIdResponse>> HandleGetPublishProductByIdAsync(
        ISender sender,
        [FromRoute] Guid productId)
    {
        var query = new GetPublishProductByIdQuery(productId);

        return await sender.Send(query);
    }

    #endregion
}
