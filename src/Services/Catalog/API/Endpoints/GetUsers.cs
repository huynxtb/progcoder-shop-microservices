
#region using

using Catalog.Api.Constants;
using Catalog.Application.Models.Responses;
using BuildingBlocks.Pagination;
using SourceCommon.Models.Reponses;
using Catalog.Application.CQRS.User.Queries;

#endregion

namespace Catalog.Api.Endpoints;

public sealed class GetUsers : ICarterModule
{
    #region Implementations

    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet(ApiRoutes.User.GetUsers, HandleGetUsersAsync)
            .WithTags(ApiRoutes.User.Tags)
            .WithName(nameof(GetUsers))
            .Produces<ResultSharedResponse<GetProductsReponse>>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .Produces(StatusCodes.Status404NotFound)
            .RequireAuthorization();
    }

    #endregion

    #region Methods

    private async Task<ResultSharedResponse<GetProductsReponse>> HandleGetUsersAsync(
        ISender sender,
        [AsParameters] GetUsersFilter filter,
        [AsParameters] PaginationRequest paging)
    {
        var query = new GetUsersQuery(
            filter,
            paging);

        return await sender.Send(query);
    }

    #endregion
}
