#region using

using Application.CQRS.Agent.Commands;
using Application.Dtos.Agent;
using SourceCommon.Constants;
using SourceCommon.Models.Reponse;
using Microsoft.AspNetCore.Mvc;

#endregion

namespace API.Endpoints;

public class AgentEndpoint : ICarterModule
{
    #region Implementations

    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost("/agents", async ([FromBody] CreateAgentDto request, 
            ISender sender, 
            IHttpContextAccessor httpContext) =>
        {
            var userIdentity = httpContext.GetUser();

            var command = new CreateAgentCommand(request, userIdentity.Id!);

            var result = await sender.Send(command);
            
            return Results.Ok(result);
        })
        //.DisableAntiforgery()
        .WithName("Agent.Create")
        .Produces<ResultSharedResponse<string>>(StatusCodes.Status200OK)
        .ProducesProblem(StatusCodes.Status400BadRequest)
        .Produces(StatusCodes.Status404NotFound)
        .RequireAuthorization(policy =>
            policy.RequireRole(AuthorizeRole.SupperAdmin));
    }

    #endregion
}
