#region using

using BuildingBlocks.Authentication.Extensions;
using Common.Models.Reponses;
using Report.Api.Constants;
using Report.Application.Features.OrderGrowthLineChart.Queries;
using Report.Application.Models.Results;

#endregion

namespace Report.Api.Endpoints;

public sealed record GetOrderGrowthLineChartRequest(int? Year, int? Month);

public sealed class GetOrderGrowthLineChart : ICarterModule
{
    #region Implementations

    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet(ApiRoutes.ReportStatistics.GetOrderGrowthStatistics, HandleGetOrderGrowthLineChartAsync)
            .WithTags(ApiRoutes.ReportStatistics.Tags)
            .WithName(nameof(GetOrderGrowthLineChart))
            .Produces<ApiGetResponse<OrderGrowthLineChartResult>>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .RequireAuthorization();
    }

    #endregion

    #region Methods

    private async Task<ApiGetResponse<OrderGrowthLineChartResult>> HandleGetOrderGrowthLineChartAsync(
        ISender sender,
        [AsParameters] GetOrderGrowthLineChartRequest request,
        CancellationToken cancellationToken)
    {
        var query = new GetOrderGrowthLineChartQuery(request.Year, request.Month);
        var result = await sender.Send(query, cancellationToken);

        return new ApiGetResponse<OrderGrowthLineChartResult>(result);
    }

    #endregion
}