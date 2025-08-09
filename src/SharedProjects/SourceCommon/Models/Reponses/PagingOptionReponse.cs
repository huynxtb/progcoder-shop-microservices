namespace SourceCommon.Models.Reponses;

public sealed class PagingOptionReponse
{
    #region Fields, Properties and Indexers

    public int Total { get; set; }

    public int PageNumber { get; set; }

    public int PageSize { get; set; }

    public bool HasItem { get; set; }

    public int TotalPages { get; set; }

    public bool HasNextPage { get; set; }

    public bool HasPreviousPage { get; set; }

    #endregion
}
