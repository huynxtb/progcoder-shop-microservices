namespace Order.Application.Models.Filters;

public class GetOrdersByCurrentUserFilter
{
    #region Fields, Properties and Indexers

    public string? SearchText { get; set; }

    public DateTime? FromDate { get; set; }

    public DateTime? ToDate { get; set; }

    #endregion
}