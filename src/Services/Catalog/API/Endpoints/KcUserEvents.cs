#region using

using Catalog.Api.Constants;
using Catalog.Application.CQRS.Keycloak.Commands;
using Catalog.Application.CQRS.User.Commands;
using Catalog.Application.Dtos.Keycloaks;
using Catalog.Application.Dtos.Users;
using Microsoft.AspNetCore.Mvc;
using SourceCommon.Configurations;
using SourceCommon.Models.Reponses;

#endregion

namespace Catalog.Api.Endpoints;

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
