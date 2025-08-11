#region using

using API.Constants;
using Application.CQRS.Keycloak.Commands;
using Application.CQRS.User.Commands;
using Application.Dtos.Keycloaks;
using Application.Dtos.Users;
using Microsoft.AspNetCore.Mvc;
using SourceCommon.Configurations;
using SourceCommon.Models.Reponses;

#endregion

namespace API.Endpoints;

public class KcUserEvents : ICarterModule
{
    #region Implementations

    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost(ApiRoutes.Keycloak.UserEvents, HandleUserEventsAsync)
        .WithName(nameof(KcUserEvents))
        .WithTags(ApiRoutes.Keycloak.Tags)
        .Produces<ResultSharedResponse<string>>(StatusCodes.Status200OK)
        .ProducesProblem(StatusCodes.Status400BadRequest)
        .Produces(StatusCodes.Status404NotFound);
    }

    #endregion

    #region Methods

    private async Task<ResultSharedResponse<string>> HandleUserEventsAsync(
        HttpContext httpContext,
        ISender sender,
        [FromRoute] string apiKey,
        [FromBody] KcUserEventDto req)
    {
        var command = new KcUserEventCommand(
            req,
            apiKey);

        var result = await sender.Send(command);

        return result;
    }

    #endregion

}
