namespace BuildingBlocks.Exceptions;

public sealed class BadRequestException : Exception
{
    #region Ctors

    public BadRequestException(string message) : base(message)
    {
    }

    public BadRequestException(string message, string details) : base(message)
    {
        Details = details;
    }

    #endregion

    #region Fields, Properties and Indexers

    public string? Details { get; }

    #endregion

}
