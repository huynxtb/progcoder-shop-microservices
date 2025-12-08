#region using

using Discount.Api.Constants;
using Discount.Application.CQRS.Coupon.Commands;
using Discount.Application.Dtos.Coupons;
using Microsoft.AspNetCore.Mvc;

#endregion

namespace Discount.Api.Endpoints;

public sealed class CreateCoupon : ICarterModule
{
    #region Implementations

    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost(ApiRoutes.Coupon.CreateCoupon, HandleCreateCouponAsync)
            .WithTags(ApiRoutes.Coupon.Tags)
            .WithName(nameof(CreateCoupon))
            .Produces<ApiCreatedResponse<Guid>>(StatusCodes.Status201Created)
            .Produces(StatusCodes.Status403Forbidden)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .DisableAntiforgery()
            .RequireAuthorization();
    }

    #endregion

    #region Methods

    private async Task<ApiCreatedResponse<Guid>> HandleCreateCouponAsync(
        ISender sender,
        [FromBody] CreateCouponDto dto)
    {
        var command = new CreateCouponCommand(dto);
        var id = await sender.Send(command);

        return new ApiCreatedResponse<Guid>(id);
    }

    #endregion
}

