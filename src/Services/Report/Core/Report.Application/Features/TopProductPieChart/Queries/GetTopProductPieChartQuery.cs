#region using

using Report.Application.Data.Repositories;
using Report.Application.Dtos.TopProductPieCharts;
using Report.Application.Models.Results;

#endregion

namespace Report.Application.Features.TopProductPieChart.Queries;

public sealed record GetTopProductPieChartQuery(int Limit = 5) : IQuery<TopProductPieChartResult>;

public sealed class GetTopProductPieChartQueryHandler(
    ITopProductPieChartRepository repository,
    IMapper mapper)
    : IQueryHandler<GetTopProductPieChartQuery, TopProductPieChartResult>
{
    #region Implementations

    public async Task<TopProductPieChartResult> Handle(GetTopProductPieChartQuery query, CancellationToken cancellationToken)
    {
        var result = await repository.GetTopProductsAsync(query.Limit, cancellationToken);
        var items = mapper.Map<List<TopProductPieChartDto>>(result);
        return new TopProductPieChartResult(items);
    }

    #endregion
}

