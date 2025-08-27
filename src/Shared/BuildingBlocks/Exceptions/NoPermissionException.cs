namespace BuildingBlocks.Exceptions;

public sealed class NoPermissionException : Exception
{
    #region Fields, Properties and Indexers

    public object? Details { get; }

    #endregion

    #region Ctors

    public NoPermissionException(string message) : base(message)
    {
    }

    public NoPermissionException(string message, object? details) : base(message)
    {
        Details = details;
    }

    #endregion

}
