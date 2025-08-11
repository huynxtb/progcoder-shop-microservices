
#region using

using API.Constants;
using Application.CQRS.AccountProfile.Queries;
using Application.Models.Responses;
using BuildingBlocks.Pagination;
using Microsoft.AspNetCore.Mvc;
using SourceCommon.Models.Reponses;

#endregion

namespace API.Endpoints;

public sealed class GetCurrentUserInfo : ICarterModule
{
    #region Implementations

    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet(ApiRoutes.User.GetCurrentUserInfo, HandleGetCurrentUserInfoAsync)
            .WithTags(ApiRoutes.User.Tags)
            .WithName(nameof(GetCurrentUserInfo))
            .Produces<ResultSharedResponse<GetUserByIdReponse>>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .Produces(StatusCodes.Status404NotFound)
            .RequireAuthorization();
    }

    #endregion

    #region Methods

    private async Task<ResultSharedResponse<GetUserByIdReponse>> HandleGetCurrentUserInfoAsync(
        ISender sender,
        IHttpContextAccessor httpContext)
    {
        var userId = httpContext.GetCurrentUser().Id;

        var query = new GetUserByIdQuery(userId);

        var result = await sender.Send(query);

        return result;
    }

    #endregion
}
