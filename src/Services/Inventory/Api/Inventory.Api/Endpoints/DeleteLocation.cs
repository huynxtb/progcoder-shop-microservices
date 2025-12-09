#region using

using Common.Models.Reponses;
using Inventory.Api.Constants;
using Inventory.Application.CQRS.Location.Commands;
using Microsoft.AspNetCore.Mvc;

#endregion

namespace Inventory.Api.Endpoints;

public sealed class DeleteLocation : ICarterModule
{
    #region Implementations

    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapDelete(ApiRoutes.Location.Delete, HandleDeleteLocationAsync)
            .WithTags(ApiRoutes.Location.Tags)
            .WithName(nameof(DeleteLocation))
            .Produces<ApiDeletedResponse<Guid>>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .ProducesProblem(StatusCodes.Status404NotFound)
            .RequireAuthorization();
    }

    #endregion

    #region Methods

    private async Task<ApiDeletedResponse<Guid>> HandleDeleteLocationAsync(
        ISender sender,
        [FromRoute] Guid locationId)
    {
        var command = new DeleteLocationCommand(locationId);

        await sender.Send(command);

        return new ApiDeletedResponse<Guid>(locationId);
    }

    #endregion
}

