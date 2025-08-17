namespace BuildingBlocks.Exceptions;

public class NoPermissionException : Exception
{
    #region Ctors

    public NoPermissionException(string message) : base(message)
    {
    }

    public NoPermissionException(string message, string details) : base(message)
    {
        Details = details;
    }

    #endregion

    #region Fields, Properties and Indexers

    public string? Details { get; }

    #endregion

}
