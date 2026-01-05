#region using

using BuildingBlocks.Authentication.Extensions;
using Discount.Api.Constants;
using Discount.Application.Features.Coupon.Commands;
using Discount.Application.Dtos.Coupons;
using Microsoft.AspNetCore.Mvc;

#endregion

namespace Discount.Api.Endpoints;

public sealed class UpdateValidityPeriod : ICarterModule
{
    #region Implementations

    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPut(ApiRoutes.Coupon.UpdateValidityPeriod, HandleUpdateValidityPeriodAsync)
            .WithTags(ApiRoutes.Coupon.Tags)
            .WithName(nameof(UpdateValidityPeriod))
            .Produces<ApiUpdatedResponse<bool>>(StatusCodes.Status200OK)
            .Produces(StatusCodes.Status403Forbidden)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .ProducesProblem(StatusCodes.Status404NotFound)
            .DisableAntiforgery()
            .RequireAuthorization();
    }

    #endregion

    #region Methods

    private async Task<ApiUpdatedResponse<bool>> HandleUpdateValidityPeriodAsync(
        ISender sender,
        IHttpContextAccessor httpContext,
        Guid id,
        [FromBody] UpdateValidityPeriodDto dto)
    {
        var currentUser = httpContext.GetCurrentUser();
        var command = new UpdateValidityPeriodCommand(id, dto, Actor.User(currentUser.Email));
        var result = await sender.Send(command);

        return new ApiUpdatedResponse<bool>(result);
    }

    #endregion
}

