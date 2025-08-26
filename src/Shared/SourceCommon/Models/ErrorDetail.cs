namespace SourceCommon.Models;

public sealed class ErrorDetail
{
    #region Ctors

    public ErrorDetail(
        string errorMessage,
        string propertyPath)
    {
        ErrorMessage = errorMessage;
        PropertyPath = propertyPath;
    }

    #endregion

    #region Fields, Properties and Indexers

    public string? ErrorMessage { get; set; }

    public string? PropertyPath { get; set; }

    #endregion
}
