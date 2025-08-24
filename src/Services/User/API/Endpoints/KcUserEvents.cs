#region using

using User.Api.Constants;
using User.Application.CQRS.Keycloak.Commands;
using User.Application.CQRS.User.Commands;
using User.Application.Dtos.Keycloaks;
using User.Application.Dtos.Users;
using Microsoft.AspNetCore.Mvc;
using SourceCommon.Configurations;
using SourceCommon.Models.Reponses;

#endregion

namespace User.Api.Endpoints;

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

        return await sender.Send(command);
    }

    #endregion

}
