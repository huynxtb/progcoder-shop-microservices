#region using

using Report.Api.Constants;
using Report.Application.CQRS.TopProductPieChart.Queries;
using Report.Application.Models.Results;
using BuildingBlocks.Authentication.Extensions;

#endregion

namespace Report.Api.Endpoints;

public sealed record GetTopProductPieChartRequest(int Limit = 5);

public sealed class GetTopProductPieChart : ICarterModule
{
    #region Implementations

    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet(ApiRoutes.TopProductPieChart.GetTopProductPieChart, HandleGetTopProductPieChartAsync)
            .WithTags(ApiRoutes.TopProductPieChart.Tags)
            .WithName(nameof(GetTopProductPieChart))
            .Produces<TopProductPieChartResult>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .RequireAuthorization();
    }

    #endregion

    #region Methods

    private async Task<TopProductPieChartResult> HandleGetTopProductPieChartAsync(
        ISender sender,
        [AsParameters] GetTopProductPieChartRequest request,
        CancellationToken cancellationToken)
    {
        var query = new GetTopProductPieChartQuery(request.Limit);
        var result = await sender.Send(query, cancellationToken);
        return result;
    }

    #endregion
}