namespace BuildingBlocks.Exceptions;

public sealed class UnauthorizedException : Exception
{
    #region Fields, Properties and Indexers

    public object? Details { get; }

    #endregion

    #region Ctors

    public UnauthorizedException(string message) : base(message)
    {
    }

    public UnauthorizedException(string message, object? details) : base(message)
    {
        Details = details;
    }

    #endregion

}