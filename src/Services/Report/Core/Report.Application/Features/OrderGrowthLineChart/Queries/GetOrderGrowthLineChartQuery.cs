#region using

using Report.Application.Data.Repositories;
using Report.Application.Dtos.OrderGrowthLineCharts;
using Report.Application.Models.Results;

#endregion

namespace Report.Application.Features.OrderGrowthLineChart.Queries;

public sealed record GetOrderGrowthLineChartQuery(int? Year = null, int? Month = null) : IQuery<OrderGrowthLineChartResult>;

public sealed class GetOrderGrowthLineChartQueryHandler(
    IOrderGrowthLineChartRepository repository,
    IMapper mapper)
    : IQueryHandler<GetOrderGrowthLineChartQuery, OrderGrowthLineChartResult>
{
    #region Implementations

    public async Task<OrderGrowthLineChartResult> Handle(GetOrderGrowthLineChartQuery query, CancellationToken cancellationToken)
    {
        List<Report.Domain.Entities.OrderGrowthLineChartEntity> result;

        if (query.Year.HasValue && query.Month.HasValue)
        {
            result = await repository.GetByMonthAsync(query.Year.Value, query.Month.Value, cancellationToken);
        }
        else
        {
            var now = DateTime.UtcNow;
            result = await repository.GetByMonthAsync(now.Year, now.Month, cancellationToken);
        }

        var items = mapper.Map<List<OrderGrowthLineChartDto>>(result);
        return new OrderGrowthLineChartResult(items);
    }

    #endregion
}

