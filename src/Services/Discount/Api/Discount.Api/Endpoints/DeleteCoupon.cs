#region using

using Discount.Api.Constants;
using Discount.Application.CQRS.Coupon.Commands;

#endregion

namespace Discount.Api.Endpoints;

public sealed class DeleteCoupon : ICarterModule
{
    #region Implementations

    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapDelete(ApiRoutes.Coupon.DeleteCoupon, HandleDeleteCouponAsync)
            .WithTags(ApiRoutes.Coupon.Tags)
            .WithName(nameof(DeleteCoupon))
            .Produces<bool>(StatusCodes.Status200OK)
            .Produces(StatusCodes.Status403Forbidden)
            .ProducesProblem(StatusCodes.Status404NotFound)
            .RequireAuthorization();
    }

    #endregion

    #region Methods

    private async Task<IResult> HandleDeleteCouponAsync(
        ISender sender,
        Guid id)
    {
        var command = new DeleteCouponCommand(id);
        var result = await sender.Send(command);
        return Results.Ok(result);
    }

    #endregion
}

