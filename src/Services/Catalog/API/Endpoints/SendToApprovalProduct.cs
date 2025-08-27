
#region using

using Catalog.Api.Constants;
using Catalog.Application.CQRS.Product.Commands;
using Catalog.Domain.Enums;
using Microsoft.AspNetCore.Mvc;
using SourceCommon.Models.Reponses;

#endregion

namespace Catalog.Api.Endpoints;

public sealed class SendToApprovalProduct : ICarterModule
{
    #region Implementations

    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost(ApiRoutes.Product.SendToApproval, HandleSendToApprovalProductAsync)
            .WithTags(ApiRoutes.Product.Tags)
            .WithName(nameof(SendToApprovalProduct))
            .Produces<ResultSharedResponse<string>>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .Produces(StatusCodes.Status404NotFound)
            .RequireAuthorization();
    }

    #endregion

    #region Methods

    private async Task<ResultSharedResponse<string>> HandleSendToApprovalProductAsync(
        ISender sender,
        IHttpContextAccessor httpContext,
        [FromRoute] Guid productId)
    {
        var currentUser = httpContext.GetCurrentUser();
        var command = new UpdateProductStatusCommand(productId, ProductStatus.AwaitingApproval, currentUser.Id);

        return await sender.Send(command);
    }

    #endregion
}
