#region using

using Discount.Api.Constants;
using Discount.Application.Features.Coupon.Queries;
using Discount.Application.Models.Results;
using Discount.Domain.Enums;
using Common.Models.Reponses;

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
            .Produces<ApiGetResponse<GetCouponsResult>>(StatusCodes.Status200OK)
            .Produces(StatusCodes.Status403Forbidden)
            .RequireAuthorization();
    }

    #endregion

    #region Methods

    private async Task<ApiGetResponse<GetCouponsResult>> HandleGetCouponsAsync(
        ISender sender,
        CouponStatus? status = null,
        CouponType? type = null,
        bool? validOnly = null)
    {
        var query = new GetCouponsQuery(status, type, validOnly);
        var result = await sender.Send(query);

        return new ApiGetResponse<GetCouponsResult>(result);
    }

    #endregion
}

