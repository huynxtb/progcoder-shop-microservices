#region using

using Discount.Api.Constants;
using Discount.Application.CQRS.Coupon.Queries;
using Discount.Application.Models.Results;
using Common.Models.Reponses;

#endregion

namespace Discount.Api.Endpoints;

public sealed class GetAllCoupons : ICarterModule
{
    #region Implementations

    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet(ApiRoutes.Coupon.GetAlloupons, HandleGetAllCouponsAsync)
            .WithTags(ApiRoutes.Coupon.Tags)
            .WithName(nameof(GetAllCoupons))
            .Produces<ApiGetResponse<GetCouponsResult>>(StatusCodes.Status200OK)
            .Produces(StatusCodes.Status403Forbidden)
            .RequireAuthorization();
    }

    #endregion

    #region Methods

    private async Task<ApiGetResponse<GetCouponsResult>> HandleGetAllCouponsAsync(
        ISender sender)
    {
        var query = new GetAllCouponsQuery();
        var result = await sender.Send(query);

        return new ApiGetResponse<GetCouponsResult>(result);
    }

    #endregion
}

