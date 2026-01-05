#region using

using Discount.Api.Constants;
using Discount.Application.Features.Coupon.Queries;
using Discount.Application.Models.Results;
using Common.Models.Reponses;

#endregion

namespace Discount.Api.Endpoints;

public sealed class GetCouponsApproved : ICarterModule
{
    #region Implementations

    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet(ApiRoutes.Coupon.GetCouponsApproved, HandleGetCouponsApprovedAsync)
            .WithTags(ApiRoutes.Coupon.Tags)
            .WithName(nameof(GetCouponsApproved))
            .Produces<ApiGetResponse<GetCouponsResult>>(StatusCodes.Status200OK)
            .Produces(StatusCodes.Status403Forbidden)
            .RequireAuthorization();
    }

    #endregion

    #region Methods

    private async Task<ApiGetResponse<GetCouponsResult>> HandleGetCouponsApprovedAsync(
        ISender sender)
    {
        var query = new GetCouponsApprovedQuery();
        var result = await sender.Send(query);

        return new ApiGetResponse<GetCouponsResult>(result);
    }

    #endregion
}

