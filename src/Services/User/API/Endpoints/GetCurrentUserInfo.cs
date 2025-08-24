
#region using

using SourceCommon.Models.Reponses;
using User.Api.Constants;
using User.Application.CQRS.User.Queries;
using User.Application.Models.Responses;
using Volo.Abp.Users;

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
        var currentUser = httpContext.GetCurrentUser();
        var query = new GetUserByIdQuery(currentUser.Id);

        return await sender.Send(query);
    }

    #endregion
}
