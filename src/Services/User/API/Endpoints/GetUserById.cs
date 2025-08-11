
#region using

using API.Constants;
using Application.CQRS.AccountProfile.Queries;
using Application.Models.Responses;
using BuildingBlocks.Pagination;
using Microsoft.AspNetCore.Mvc;
using SourceCommon.Models.Reponses;

#endregion

namespace API.Endpoints;

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
