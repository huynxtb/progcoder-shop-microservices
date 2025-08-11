
#region using

using API.Constants;
using Application.CQRS.AccountProfile.Queries;
using Application.Models.Responses;
using BuildingBlocks.Pagination;
using SourceCommon.Models.Reponses;

#endregion

namespace API.Endpoints;

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
        [AsParameters] PaginationRequest pagination)
    {
        var userId = httpContext.GetCurrentUser().Id;

        filter ??= new GetLoginHistoriesFilter(string.Empty, userId);

        var query = new GetLoginHistoriesQuery(
            filter,
            pagination);

        var result = await sender.Send(query);

        return result;
    }

    #endregion
}
