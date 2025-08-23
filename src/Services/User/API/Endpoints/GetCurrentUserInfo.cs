
#region using

using User.Api.Constants;
using User.Application.Models.Responses;
using SourceCommon.Models.Reponses;
using User.Application.CQRS.User.Queries;

#endregion

namespace User.Api.Endpoints;

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
