#region using

using Basket.Api.Constants;
using Basket.Application.CQRS.Product.Queries;
using Basket.Application.Models.Results;
using Microsoft.AspNetCore.Mvc;
using Common.Models.Reponses;

#endregion

namespace Basket.Api.Endpoints;

public sealed class GetPublishProductById : ICarterModule
{
    #region Implementations

    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet(ApiRoutes.Product.GetPublishProductById, HandleGetPublishProductByIdAsync)
            .WithTags(ApiRoutes.Product.Tags)
            .WithName(nameof(GetPublishProductById))
            .Produces<ResultSharedResponse<GetPublishProductByIdResult>>(StatusCodes.Status200OK)
            .Produces(StatusCodes.Status403Forbidden)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .ProducesProblem(StatusCodes.Status404NotFound);
    }

    #endregion

    #region Methods

    private async Task<GetPublishProductByIdResult> HandleGetPublishProductByIdAsync(
        ISender sender,
        [FromRoute] Guid productId)
    {
        var query = new GetPublishProductByIdQuery(productId);

        return await sender.Send(query);
    }

    #endregion
}
