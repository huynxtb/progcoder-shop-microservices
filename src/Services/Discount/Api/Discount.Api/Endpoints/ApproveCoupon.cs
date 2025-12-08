#region using

using Discount.Api.Constants;
using Discount.Application.CQRS.Coupon.Commands;

#endregion

namespace Discount.Api.Endpoints;

public sealed class ApproveCoupon : ICarterModule
{
    #region Implementations

    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost(ApiRoutes.Coupon.ApproveCoupon, HandleApproveCouponAsync)
            .WithTags(ApiRoutes.Coupon.Tags)
            .WithName(nameof(ApproveCoupon))
            .Produces<ApiUpdatedResponse<bool>>(StatusCodes.Status200OK)
            .Produces(StatusCodes.Status403Forbidden)
            .ProducesProblem(StatusCodes.Status404NotFound)
            .RequireAuthorization();
    }

    #endregion

    #region Methods

    private async Task<ApiUpdatedResponse<bool>> HandleApproveCouponAsync(
        ISender sender,
        Guid id)
    {
        var command = new ApproveCouponCommand(id);

        var result = await sender.Send(command);

        return new ApiUpdatedResponse<bool>(result);
    }

    #endregion
}

