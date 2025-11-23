#region using

using Report.Application.Dtos.Abstractions;

#endregion

namespace Report.Application.Dtos.TopProductPieCharts;

public sealed class TopProductPieChartDto : DtoId<Guid>
{
    #region Fields, Properties and Indexers

    public string Name { get; set; } = default!;

    public double Value { get; set; }

    #endregion
}

