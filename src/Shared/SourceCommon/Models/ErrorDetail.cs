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

    public string? ErrorMessage { get; private set; }

    public string? PropertyPath { get; private set; }

    #endregion
}
