#region using

using Report.Application.Data.Repositories;
using Report.Application.Dtos.DashboardTotals;
using Report.Application.Models.Results;

#endregion

namespace Report.Application.CQRS.DashboardTotal.Queries;

public sealed record GetDashboardTotalsQuery() : IQuery<DashboardTotalsResult>;

public sealed class GetDashboardTotalsQueryHandler(
    IDashboardTotalRepository repository,
    IMapper mapper)
    : IQueryHandler<GetDashboardTotalsQuery, DashboardTotalsResult>
{
    #region Implementations

    public async Task<DashboardTotalsResult> Handle(GetDashboardTotalsQuery query, CancellationToken cancellationToken)
    {
        var result = await repository.GetAllAsync(cancellationToken);
        var items = mapper.Map<List<DashboardTotalDto>>(result);
        return new DashboardTotalsResult(items);
    }

    #endregion
}

