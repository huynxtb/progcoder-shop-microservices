#region using

using Discount.Api.Constants;
using Discount.Application.Features.Coupon.Queries;
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
            .Produces<ApiGetResponse<GetCouponByIdResult>>(StatusCodes.Status200OK)
            .Produces(StatusCodes.Status403Forbidden)
            .ProducesProblem(StatusCodes.Status404NotFound)
            .RequireAuthorization();
    }

    #endregion

    #region Methods

    private async Task<ApiGetResponse<GetCouponByIdResult>> HandleGetCouponAsync(
        ISender sender,
        Guid id)
    {
        var query = new GetCouponByIdQuery(id);
        var result = await sender.Send(query);

        return new ApiGetResponse<GetCouponByIdResult>(result);
    }

    #endregion
}

