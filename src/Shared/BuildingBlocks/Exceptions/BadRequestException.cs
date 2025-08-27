namespace BuildingBlocks.Exceptions;

public sealed class BadRequestException : Exception
{
    #region Fields, Properties and Indexers

    public object? Details { get; }

    #endregion

    #region Ctors

    public BadRequestException(string message) : base(message)
    {
    }

    public BadRequestException(string message, object? details) : base(message)
    {
        Details = details;
    }

    #endregion
}
