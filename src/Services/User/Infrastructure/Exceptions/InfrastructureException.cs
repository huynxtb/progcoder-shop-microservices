namespace User.Infrastructure.Exceptions;

public sealed class InfrastructureException : Exception
{
    #region Ctors

    public InfrastructureException(string message) : base(message)
    {
    }

    #endregion
}
