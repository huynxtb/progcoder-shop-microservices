namespace Report.Application.Dtos.TopProductPieCharts;

public sealed class UpdateTopProductPieChartDto
{
    #region Fields, Properties and Indexers

    public string Name { get; set; } = default!;

    public double Value { get; set; }

    #endregion
}

public sealed class UpdateTopProductPieChartListDto
{
    #region Fields, Properties and Indexers

    public List<UpdateTopProductPieChartDto> Items { get; set; } = new();

    #endregion
}

