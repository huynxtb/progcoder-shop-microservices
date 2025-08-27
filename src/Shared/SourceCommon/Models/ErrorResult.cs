namespace SourceCommon.Models;

public sealed class ErrorResult
{
    #region Ctors

    public ErrorResult(
        string errorMessage,
        object? details)
    {
        ErrorMessage = errorMessage;
        Details = details;
    }

    #endregion

    #region Fields, Properties and Indexers

    public string? ErrorMessage { get; set; }

    public object? Details { get; set; }

    #endregion
}
