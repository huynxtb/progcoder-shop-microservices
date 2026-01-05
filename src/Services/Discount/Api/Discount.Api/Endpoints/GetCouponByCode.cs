#region using

using Discount.Api.Constants;
using Discount.Application.Features.Coupon.Queries;
using Discount.Application.Models.Results;

#endregion

namespace Discount.Api.Endpoints;

public sealed class GetCouponByCode : ICarterModule
{
    #region Implementations

    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet(ApiRoutes.Coupon.GetCouponByCode, HandleGetCouponByCodeAsync)
            .WithTags(ApiRoutes.Coupon.Tags)
            .WithName(nameof(GetCouponByCode))
            .Produces<ApiGetResponse<GetCouponByIdResult>>(StatusCodes.Status200OK)
            .Produces(StatusCodes.Status403Forbidden)
            .ProducesProblem(StatusCodes.Status404NotFound);
    }

    #endregion

    #region Methods

    private async Task<ApiGetResponse<GetCouponByIdResult>> HandleGetCouponByCodeAsync(
        ISender sender,
        string code)
    {
        var query = new GetCouponByCodeQuery(code);

        var result = await sender.Send(query);

        return new ApiGetResponse<GetCouponByIdResult>(result);
    }

    #endregion
}

