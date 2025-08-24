namespace Catalog.Application.Exceptions;

public sealed class ApplicationException : Exception
{
    #region Ctors

    public ApplicationException(string message) : base(message)
    {
    }

    #endregion
}
