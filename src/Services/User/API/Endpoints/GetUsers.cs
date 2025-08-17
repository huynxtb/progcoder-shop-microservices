
#region using

using User.Api.Constants;
using User.Application.CQRS.AccountProfile.Queries;
using User.Application.Models.Responses;
using BuildingBlocks.Pagination;
using SourceCommon.Models.Reponses;

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
            .Produces(StatusCodes.Status404NotFound)
            .RequireAuthorization();
    }

    #endregion

    #region Methods

    private async Task<ResultSharedResponse<GetUsersReponse>> HandleGetUsersAsync(
        ISender sender,
        [AsParameters] GetUsersFilter filter,
        [AsParameters] PaginationRequest pagination)
    {
        var query = new GetUsersQuery(
            filter,
            pagination);

        var result = await sender.Send(query);

        return result;
    }

    #endregion
}
