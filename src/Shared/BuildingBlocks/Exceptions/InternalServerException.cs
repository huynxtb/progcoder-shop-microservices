namespace BuildingBlocks.Exceptions;

public sealed class InternalServerException : Exception
{
    #region Fields, Properties and Indexers

    public object? Details { get; }

    #endregion

    #region Ctors

    public InternalServerException(string message) : base(message)
    {
    }

    public InternalServerException(string message, object? details) : base(message)
    {
        Details = details;
    }

    #endregion

}
