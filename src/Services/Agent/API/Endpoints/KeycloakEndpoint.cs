#region using

using Application.CQRS.Keycloak.Commands;
using Application.Dtos.Keycloak;
using SourceCommon.Constants;
using SourceCommon.Models.Reponse;
using Elastic.Transport;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Text;

#endregion

namespace API.Endpoints;

public class KeycloakEndpoint : ICarterModule
{
    #region Implementations

    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost("/keycloak/events/{apiKey}", async ([FromRoute] string apiKey,
            [FromBody] KeycloakUserEventDto req,
            HttpContext httpContext,
            ISender sender,
            IConfiguration configuration) =>
        {
            if (configuration[$"{AppConfig.Section}:{AppConfig.ApiKey}"] != apiKey)
            {
                return Results.Unauthorized();
            }

            //var command = new CreateKeycloakCommand(userRegister!);

            //var result = await sender.Send(command);

            return Results.Ok(req);
        })
        //.DisableAntiforgery()
        .WithName("Keycloak.Create")
        .Produces<ResultSharedResponse<string>>(StatusCodes.Status200OK)
        .ProducesProblem(StatusCodes.Status400BadRequest)
        .Produces(StatusCodes.Status404NotFound);
    }

    #endregion

}
