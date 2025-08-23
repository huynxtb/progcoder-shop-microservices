
#region using

using User.Api.Constants;
using User.Application.Models.Responses;
using BuildingBlocks.Pagination;
using SourceCommon.Models.Reponses;
using User.Application.CQRS.LoginHistory.Queries;

#endregion

namespace User.Api.Endpoints;

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
        var userId = httpContext.GetCurrentUser().Id;

        var query = new GetLoginHistoriesQuery(
            filter,
            paging,
            userId);

        var result = await sender.Send(query);

        return result;
    }

    #endregion
}
