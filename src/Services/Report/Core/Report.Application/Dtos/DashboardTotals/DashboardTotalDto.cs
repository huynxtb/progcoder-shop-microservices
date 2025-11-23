#region using

using Report.Application.Dtos.Abstractions;

#endregion

namespace Report.Application.Dtos.DashboardTotals;

public sealed class DashboardTotalDto : DtoId<Guid>
{
    #region Fields Properties and Indexers

    public string? Bg { get; set; }

    public string? Text { get; set; }

    public string? Icon { get; set; }

    public string? Title { get; set; }

    public string? Count { get; set; }

    #endregion
}

