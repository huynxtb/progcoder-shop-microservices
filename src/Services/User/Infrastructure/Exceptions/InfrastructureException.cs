namespace Infrastructure.Exceptions;

public class InfrastructureException : Exception
{
    #region Ctors

    public InfrastructureException(string message)
        : base($"Infrastructure Exception: \"{message}\" throws from Infrastructure Layer.")
    {
    }

    #endregion
}
