namespace Report.Application.Dtos.OrderGrowthLineCharts;

public sealed class UpdateOrderGrowthLineChartDto
{
    #region Fields, Properties and Indexers

    public int Day { get; set; }

    public double Value { get; set; }

    public DateTime Date { get; set; }

    #endregion
}

public sealed class UpdateOrderGrowthLineChartListDto
{
    #region Fields, Properties and Indexers

    public List<UpdateOrderGrowthLineChartDto> Items { get; set; } = new();

    #endregion
}

