#region using

using Discount.Api.Constants;
using Discount.Application.CQRS.Coupon.Queries;
using Discount.Application.Models.Results;
using Discount.Domain.Enums;

#endregion

namespace Discount.Api.Endpoints;

public sealed class GetCoupons : ICarterModule
{
    #region Implementations

    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet(ApiRoutes.Coupon.GetCoupons, HandleGetCouponsAsync)
            .WithTags(ApiRoutes.Coupon.Tags)
            .WithName(nameof(GetCoupons))
            .Produces<GetCouponsResult>(StatusCodes.Status200OK)
            .Produces(StatusCodes.Status403Forbidden)
            .RequireAuthorization();
    }

    #endregion

    #region Methods

    private async Task<GetCouponsResult> HandleGetCouponsAsync(
        ISender sender,
        CouponStatus? status = null,
        CouponType? type = null,
        bool? validOnly = null)
    {
        var query = new GetCouponsQuery(status, type, validOnly);
        return await sender.Send(query);
    }

    #endregion
}

