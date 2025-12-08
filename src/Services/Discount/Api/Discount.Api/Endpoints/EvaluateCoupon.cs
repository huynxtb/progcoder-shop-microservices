#region using

using Common.Models.Reponses;
using Discount.Api.Constants;
using Discount.Application.CQRS.Coupon.Commands;
using Discount.Application.Dtos.Coupons;
using Discount.Application.Models.Results;
using Microsoft.AspNetCore.Mvc;

#endregion

namespace Discount.Api.Endpoints;

public sealed class EvaluateCoupon : ICarterModule
{
    #region Implementations

    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost(ApiRoutes.Coupon.EvaluateCoupon, HandleEvaluateCouponAsync)
            .WithTags(ApiRoutes.Coupon.Tags)
            .WithName(nameof(EvaluateCoupon))
            .Produces<ApiPerformedResponse<EvaluateCouponResult>>(StatusCodes.Status200OK)
            .Produces(StatusCodes.Status403Forbidden)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .ProducesProblem(StatusCodes.Status404NotFound)
            .DisableAntiforgery();
    }

    #endregion

    #region Methods

    private async Task<ApiPerformedResponse<EvaluateCouponResult>> HandleEvaluateCouponAsync(
        ISender sender,
        [FromBody] EvaluateCouponDto dto)
    {
        var command = new EvaluateCouponCommand(dto);

        var result = await sender.Send(command);

        return new ApiPerformedResponse<EvaluateCouponResult>(result);
    }

    #endregion
}

