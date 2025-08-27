namespace BuildingBlocks.Exceptions;

public sealed class NotFoundException : Exception
{
    #region Fields, Properties and Indexers

    public object? Details { get; }

    #endregion

    #region Ctors

    public NotFoundException(string message) : base(message)
    {
    }

    public NotFoundException(string message, object? details) : base(message)
    {
        Details = details;
    }

    #endregion

}
