
#region using

using User.Api.Constants;
using User.Application.CQRS.AccountProfile.Queries;
using User.Application.Models.Responses;
using Microsoft.AspNetCore.Mvc;
using SourceCommon.Models.Reponses;

#endregion

namespace User.Api.Endpoints;

public sealed class GetUserById : ICarterModule
{
    #region Implementations

    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet(ApiRoutes.User.GetById, HandleGetUserByIdAsync)
            .WithTags(ApiRoutes.User.Tags)
            .WithName(nameof(GetUserById))
            .Produces<ResultSharedResponse<GetUserByIdReponse>>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .Produces(StatusCodes.Status404NotFound)
            .RequireAuthorization();
    }

    #endregion

    #region Methods

    private async Task<ResultSharedResponse<GetUserByIdReponse>> HandleGetUserByIdAsync(
        ISender sender,
        [FromRoute] Guid userId)
    {
        var query = new GetUserByIdQuery(userId);

        var result = await sender.Send(query);

        return result;
    }

    #endregion
}
