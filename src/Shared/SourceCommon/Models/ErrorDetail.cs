namespace SourceCommon.Models;

public sealed class ErrorDetail
{
    #region Ctors

    public ErrorDetail(
        string errorMessage,
        string details)
    {
        ErrorMessage = errorMessage;
        Details = details;
    }

    #endregion

    #region Fields, Properties and Indexers

    public string? ErrorMessage { get; set; }

    public string? Details { get; set; }

    #endregion
}
