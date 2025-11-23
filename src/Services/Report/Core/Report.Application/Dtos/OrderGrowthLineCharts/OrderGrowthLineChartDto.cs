#region using

using Report.Application.Dtos.Abstractions;

#endregion

namespace Report.Application.Dtos.OrderGrowthLineCharts;

public sealed class OrderGrowthLineChartDto : DtoId<Guid>
{
    #region Fields, Properties and Indexers

    public int Day { get; set; }

    public double Value { get; set; }

    public DateTime Date { get; set; }

    #endregion
}

