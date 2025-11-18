#region using

using Discount.Api.Constants;
using Discount.Application.CQRS.Coupon.Commands;
using Discount.Application.Dtos.Coupons;
using Discount.Application.Models.Results;
using Microsoft.AspNetCore.Mvc;

#endregion

namespace Discount.Api.Endpoints;

public sealed class ApplyCoupon : ICarterModule
{
    #region Implementations

    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost(ApiRoutes.Coupon.ApplyCoupon, HandleApplyCouponAsync)
            .WithTags(ApiRoutes.Coupon.Tags)
            .WithName(nameof(ApplyCoupon))
            .Produces<ApplyCouponResult>(StatusCodes.Status200OK)
            .Produces(StatusCodes.Status403Forbidden)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .ProducesProblem(StatusCodes.Status404NotFound)
            .DisableAntiforgery();
    }

    #endregion

    #region Methods

    private async Task<ApplyCouponResult> HandleApplyCouponAsync(
        ISender sender,
        [FromBody] ApplyCouponDto dto)
    {
        var command = new ApplyCouponCommand(dto);
        return await sender.Send(command);
    }

    #endregion
}

