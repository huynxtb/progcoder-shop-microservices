#region using

using Report.Api.Constants;
using Report.Application.CQRS.DashboardTotal.Queries;
using Report.Application.Models.Results;
using BuildingBlocks.Authentication.Extensions;

#endregion

namespace Report.Api.Endpoints;

public sealed class GetDashboardTotals : ICarterModule
{
    #region Implementations

    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet(ApiRoutes.DashboardTotal.GetDashboardTotals, HandleGetDashboardTotalsAsync)
            .WithTags(ApiRoutes.DashboardTotal.Tags)
            .WithName(nameof(GetDashboardTotals))
            .Produces<DashboardTotalsResult>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .RequireAuthorization();
    }

    #endregion

    #region Methods

    private async Task<DashboardTotalsResult> HandleGetDashboardTotalsAsync(
        ISender sender,
        CancellationToken cancellationToken)
    {
        var query = new GetDashboardTotalsQuery();
        var result = await sender.Send(query, cancellationToken);
        return result;
    }

    #endregion
}

