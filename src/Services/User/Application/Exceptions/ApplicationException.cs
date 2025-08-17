namespace User.Application.Exceptions;

public class ApplicationException : Exception
{
    #region Ctors

    public ApplicationException(string message) : base(message)
    {
    }

    #endregion
}
