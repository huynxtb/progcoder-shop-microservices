#region using

using Discount.Api.Constants;
using Discount.Application.CQRS.Coupon.Queries;
using Discount.Application.Models.Results;

#endregion

namespace Discount.Api.Endpoints;

public sealed class GetCoupon : ICarterModule
{
    #region Implementations

    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet(ApiRoutes.Coupon.GetCoupon, HandleGetCouponAsync)
            .WithTags(ApiRoutes.Coupon.Tags)
            .WithName(nameof(GetCoupon))
            .Produces<GetCouponResult>(StatusCodes.Status200OK)
            .Produces(StatusCodes.Status403Forbidden)
            .ProducesProblem(StatusCodes.Status404NotFound)
            .RequireAuthorization();
    }

    #endregion

    #region Methods

    private async Task<GetCouponResult> HandleGetCouponAsync(
        ISender sender,
        Guid id)
    {
        var query = new GetCouponQuery(id);
        return await sender.Send(query);
    }

    #endregion
}

