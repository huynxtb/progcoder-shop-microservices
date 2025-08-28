
#region using

using User.Api.Constants;
using User.Application.Models.Responses;
using BuildingBlocks.Pagination;
using SourceCommon.Models.Reponses;
using User.Application.CQRS.User.Queries;

#endregion

namespace User.Api.Endpoints;

public sealed class GetUsers : ICarterModule
{
    #region Implementations

    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet(ApiRoutes.User.GetUsers, HandleGetUsersAsync)
            .WithTags(ApiRoutes.User.Tags)
            .WithName(nameof(GetUsers))
            .Produces<ResultSharedResponse<GetUsersReponse>>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .ProducesProblem(StatusCodes.Status404NotFound)
            .RequireAuthorization();
    }

    #endregion

    #region Methods

    private async Task<ResultSharedResponse<GetUsersReponse>> HandleGetUsersAsync(
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
