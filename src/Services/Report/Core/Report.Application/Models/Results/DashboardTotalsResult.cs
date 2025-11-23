#region using

using Report.Application.Dtos.DashboardTotals;

#endregion

namespace Report.Application.Models.Results;

public sealed class DashboardTotalsResult
{
    #region Fields Properties and Indexers

    public List<DashboardTotalDto> Items { get; set; } = new();

    #endregion

    #region Ctors

    public DashboardTotalsResult(List<DashboardTotalDto> items)
    {
        Items = items;
    }

    #endregion
}

