namespace User.Domain.Exceptions;

public sealed class DomainException : Exception
{
    public DomainException(string message)
        : base($"Domain Exception: \"{message}\" throws from Domain Layer.")
    {
    }
}
