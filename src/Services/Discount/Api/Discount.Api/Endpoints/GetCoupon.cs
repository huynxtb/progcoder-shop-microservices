#region using

using Discount.Api.Constants;
using Discount.Application.CQRS.Coupon.Queries;
using Discount.Application.Models.Results;
using Common.Models.Reponses;

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
            .Produces<ApiGetResponse<GetCouponResult>>(StatusCodes.Status200OK)
            .Produces(StatusCodes.Status403Forbidden)
            .ProducesProblem(StatusCodes.Status404NotFound)
            .RequireAuthorization();
    }

    #endregion

    #region Methods

    private async Task<ApiGetResponse<GetCouponResult>> HandleGetCouponAsync(
        ISender sender,
        Guid id)
    {
        var query = new GetCouponQuery(id);
        var result = await sender.Send(query);

        return new ApiGetResponse<GetCouponResult>(result);
    }

    #endregion
}

