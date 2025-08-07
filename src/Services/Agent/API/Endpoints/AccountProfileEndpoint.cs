#region using

using Application.CQRS.AccountProfile.Queries;
using Application.CQRS.Agent.Commands;
using Application.Dtos.AccountProfile;
using Application.Dtos.Agent;
using SourceCommon.Constants;
using SourceCommon.Models.Reponse;
using Microsoft.AspNetCore.Mvc;

#endregion

namespace API.Endpoints;

public class AccountProfileEndpoint : ICarterModule
{
    #region Implementations

    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("/account-profiles/{id}", async ([FromRoute] long id,
            ISender sender) =>
        {
            var query = new GetAccountProfileByIdQuery(id);

            var result = await sender.Send(query);

            return Results.Ok(result);
        })
        .WithName("AccountProfile.GetAccountProfileById")
        .Produces<ResultSharedResponse<AccountProfileDto>>(StatusCodes.Status200OK)
        .ProducesProblem(StatusCodes.Status400BadRequest)
        .Produces(StatusCodes.Status404NotFound)
        .RequireAuthorization(policy =>
            policy.RequireRole(AuthorizeRole.SupperAdmin));

        app.MapGet("/account-profiles/{userNo}/keycloak", async ([FromRoute] string userNo,
            ISender sender) =>
        {
            var query = new GetAccountProfileByKeycloakUserNoQuery(Guid.Parse(userNo));

            var result = await sender.Send(query);

            return Results.Ok(result);
        })
        .WithName("AccountProfile.GetAccountProfileByKeycloakUserNo")
        .Produces<ResultSharedResponse<AccountProfileDto>>(StatusCodes.Status200OK)
        .ProducesProblem(StatusCodes.Status400BadRequest)
        .Produces(StatusCodes.Status404NotFound)
        .RequireAuthorization(policy =>
            policy.RequireRole(AuthorizeRole.SupperAdmin));
    }

    #endregion
}
