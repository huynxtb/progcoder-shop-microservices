#region using

using BuildingBlocks.Authentication.Extensions;
using Common.Models.Reponses;
using Report.Api.Constants;
using Report.Application.CQRS.DashboardTotal.Queries;
using Report.Application.Models.Results;

#endregion

namespace Report.Api.Endpoints;

public sealed class GetDashboardTotals : ICarterModule
{
    #region Implementations

    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet(ApiRoutes.ReportStatistics.GetDashboardStatistics, HandleGetDashboardTotalsAsync)
            .WithTags(ApiRoutes.ReportStatistics.Tags)
            .WithName(nameof(GetDashboardTotals))
            .Produces<ApiGetResponse<DashboardTotalsResult>>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .RequireAuthorization();
    }

    #endregion

    #region Methods

    private async Task<ApiGetResponse<DashboardTotalsResult>> HandleGetDashboardTotalsAsync(
        ISender sender,
        CancellationToken cancellationToken)
    {
        var query = new GetDashboardTotalsQuery();
        var result = await sender.Send(query, cancellationToken);

        return new ApiGetResponse<DashboardTotalsResult>(result);
    }

    #endregion
}

