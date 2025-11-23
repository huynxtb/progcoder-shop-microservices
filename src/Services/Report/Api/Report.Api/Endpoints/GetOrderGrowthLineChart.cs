#region using

using Report.Api.Constants;
using Report.Application.CQRS.OrderGrowthLineChart.Queries;
using Report.Application.Models.Results;
using BuildingBlocks.Authentication.Extensions;

#endregion

namespace Report.Api.Endpoints;

public sealed record GetOrderGrowthLineChartRequest(int? Year, int? Month);

public sealed class GetOrderGrowthLineChart : ICarterModule
{
    #region Implementations

    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet(ApiRoutes.OrderGrowthLineChart.GetOrderGrowthLineChart, HandleGetOrderGrowthLineChartAsync)
            .WithTags(ApiRoutes.OrderGrowthLineChart.Tags)
            .WithName(nameof(GetOrderGrowthLineChart))
            .Produces<OrderGrowthLineChartResult>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .RequireAuthorization();
    }

    #endregion

    #region Methods

    private async Task<OrderGrowthLineChartResult> HandleGetOrderGrowthLineChartAsync(
        ISender sender,
        [AsParameters] GetOrderGrowthLineChartRequest request,
        CancellationToken cancellationToken)
    {
        var query = new GetOrderGrowthLineChartQuery(request.Year, request.Month);
        var result = await sender.Send(query, cancellationToken);
        return result;
    }

    #endregion
}