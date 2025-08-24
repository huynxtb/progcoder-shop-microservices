namespace BuildingBlocks.Exceptions;

public sealed class InternalServerException : Exception
{
    #region Ctors

    public InternalServerException(string message) : base(message)
    {
    }

    public InternalServerException(string message, string details) : base(message)
    {
        Details = details;
    }

    #endregion

    #region Fields, Properties and Indexers

    public string? Details { get; }

    #endregion

}
