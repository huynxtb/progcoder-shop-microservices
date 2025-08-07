
#region using

using API.Constants;
using SourceCommon.Constants;
using SourceCommon.Models.Reponse;

#endregion

namespace API.Endpoints;

public class GetUsers : ICarterModule
{
    #region Implementations

    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet(ApiRoutes.Users.Base, async (ISender sender,
            IHttpContextAccessor httpContext) =>
        {
            return Results.Ok(1);
        })
        //.DisableAntiforgery()
        .WithName(nameof(GetUsers))
        .Produces<ResultSharedResponse<string>>(StatusCodes.Status200OK)
        .ProducesProblem(StatusCodes.Status400BadRequest)
        .Produces(StatusCodes.Status404NotFound)
        .RequireAuthorization(policy =>
            policy.RequireRole(AuthorizeRole.SupperAdmin));
    }

    #endregion
}
