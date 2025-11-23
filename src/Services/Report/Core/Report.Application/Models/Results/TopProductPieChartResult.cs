#region using

using Report.Application.Dtos.TopProductPieCharts;

#endregion

namespace Report.Application.Models.Results;

public sealed class TopProductPieChartResult
{
    #region Fields, Properties and Indexers

    public List<TopProductPieChartDto> Items { get; set; } = new();

    #endregion

    #region Ctors

    public TopProductPieChartResult(List<TopProductPieChartDto> items)
    {
        Items = items;
    }

    #endregion
}

