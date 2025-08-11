namespace BuildingBlocks.Exceptions;

public class UnauthorizedException : Exception
{
    #region Ctors

    public UnauthorizedException(string message) : base(message)
    {
    }

    public UnauthorizedException(string message, string details) : base(message)
    {
        Details = details;
    }

    #endregion

    #region Fields, Properties and Indexers

    public string? Details { get; }

    #endregion

}