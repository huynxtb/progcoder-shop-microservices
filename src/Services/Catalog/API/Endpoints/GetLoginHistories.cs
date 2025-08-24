
#region using

using Catalog.Api.Constants;
using Catalog.Application.Models.Responses;
using BuildingBlocks.Pagination;
using SourceCommon.Models.Reponses;
using Catalog.Application.CQRS.LoginHistory.Queries;

#endregion

namespace Catalog.Api.Endpoints;

public sealed class GetLoginHistories : ICarterModule
{
    #region Implementations

    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet(ApiRoutes.LoginHistory.GetLoginHistories, HandleGetLoginHistoriesAsync)
            .WithTags(ApiRoutes.User.Tags)
            .WithName(nameof(GetLoginHistories))
            .Produces<ResultSharedResponse<GetLoginHistoriesReponse>>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .Produces(StatusCodes.Status404NotFound)
            .RequireAuthorization();
    }

    #endregion

    #region Methods

    private async Task<ResultSharedResponse<GetLoginHistoriesReponse>> HandleGetLoginHistoriesAsync(
        ISender sender,
        IHttpContextAccessor httpContext,
        [AsParameters] GetLoginHistoriesFilter filter,
        [AsParameters] PaginationRequest paging)
    {
        var currentUser = httpContext.GetCurrentUser();
        var query = new GetLoginHistoriesQuery(
            filter,
            paging,
            currentUser.Id);

        return await sender.Send(query);
    }

    #endregion
}
