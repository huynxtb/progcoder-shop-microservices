
#region using

using SourceCommon.Models.Reponses;
using Catalog.Api.Constants;
using Catalog.Application.CQRS.User.Queries;
using Catalog.Application.Models.Responses;
using Volo.Abp.Users;

#endregion

namespace Catalog.Api.Endpoints;

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
