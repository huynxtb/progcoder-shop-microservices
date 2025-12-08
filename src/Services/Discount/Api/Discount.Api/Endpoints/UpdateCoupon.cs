#region using

using Discount.Api.Constants;
using Discount.Application.CQRS.Coupon.Commands;
using Discount.Application.Dtos.Coupons;
using Microsoft.AspNetCore.Mvc;

#endregion

namespace Discount.Api.Endpoints;

public sealed class UpdateCoupon : ICarterModule
{
    #region Implementations

    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPut(ApiRoutes.Coupon.UpdateCoupon, HandleUpdateCouponAsync)
            .WithTags(ApiRoutes.Coupon.Tags)
            .WithName(nameof(UpdateCoupon))
            .Produces<ApiUpdatedResponse<bool>>(StatusCodes.Status200OK)
            .Produces(StatusCodes.Status403Forbidden)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .ProducesProblem(StatusCodes.Status404NotFound)
            .DisableAntiforgery()
            .RequireAuthorization();
    }

    #endregion

    #region Methods

    private async Task<ApiUpdatedResponse<bool>> HandleUpdateCouponAsync(
        ISender sender,
        Guid id,
        [FromBody] UpdateCouponDto dto)
    {
        var command = new UpdateCouponCommand(id, dto);
        var result = await sender.Send(command);

        return new ApiUpdatedResponse<bool>(result);
    }

    #endregion
}

