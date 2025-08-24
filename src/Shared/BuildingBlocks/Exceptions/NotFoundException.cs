namespace BuildingBlocks.Exceptions;

public sealed class NotFoundException : Exception
{
    #region Ctors

    public NotFoundException(string message) : base(message)
    {
    }

    public NotFoundException(string message, string details) : base(message)
    {
        Details = details;
    }

    #endregion

    #region Fields, Properties and Indexers

    public string? Details { get; }

    #endregion

}
