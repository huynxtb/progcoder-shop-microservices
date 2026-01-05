#region using

using Catalog.Api.Constants;
using Catalog.Application.Features.Product.Queries;
using Catalog.Application.Models.Results;
using Microsoft.AspNetCore.Mvc;
using Common.Models.Reponses;

#endregion

namespace Catalog.Api.Endpoints;

public sealed class GetPublishProductById : ICarterModule
{
    #region Implementations

    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet(ApiRoutes.Product.GetPublicProductById, HandleGetPublishProductByIdAsync)
            .WithTags(ApiRoutes.Product.Tags)
            .WithName(nameof(GetPublishProductById))
            .Produces<ApiGetResponse<GetPublishProductByIdResult>>(StatusCodes.Status200OK)
            .Produces(StatusCodes.Status403Forbidden)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .ProducesProblem(StatusCodes.Status404NotFound);
    }

    #endregion

    #region Methods

    private async Task<ApiGetResponse<GetPublishProductByIdResult>> HandleGetPublishProductByIdAsync(
        ISender sender,
        [FromRoute] Guid productId)
    {
        var query = new GetPublishProductByIdQuery(productId);
        var result = await sender.Send(query);

        return new ApiGetResponse<GetPublishProductByIdResult>(result);
    }

    #endregion
}
