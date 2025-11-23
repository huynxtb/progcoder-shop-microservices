#region using

using Report.Application.Dtos.OrderGrowthLineCharts;

#endregion

namespace Report.Application.Models.Results;

public sealed class OrderGrowthLineChartResult
{
    #region Fields, Properties and Indexers

    public List<OrderGrowthLineChartDto> Items { get; set; } = new();

    #endregion

    #region Ctors

    public OrderGrowthLineChartResult(List<OrderGrowthLineChartDto> items)
    {
        Items = items;
    }

    #endregion
}

