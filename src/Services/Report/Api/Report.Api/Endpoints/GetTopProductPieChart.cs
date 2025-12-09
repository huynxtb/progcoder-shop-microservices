#region using

using BuildingBlocks.Authentication.Extensions;
using Common.Models.Reponses;
using Report.Api.Constants;
using Report.Application.CQRS.TopProductPieChart.Queries;
using Report.Application.Models.Results;

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
            .Produces<ApiGetResponse<TopProductPieChartResult>>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .RequireAuthorization();
    }

    #endregion

    #region Methods

    private async Task<ApiGetResponse<TopProductPieChartResult>> HandleGetTopProductPieChartAsync(
        ISender sender,
        [AsParameters] GetTopProductPieChartRequest request,
        CancellationToken cancellationToken)
    {
        var query = new GetTopProductPieChartQuery(request.Limit);
        var result = await sender.Send(query, cancellationToken);

        return new ApiGetResponse<TopProductPieChartResult>(result);
    }

    #endregion
}