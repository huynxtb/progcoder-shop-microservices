namespace Common.Models.Reponses;

public sealed class ApiDeletedResponse<T>
{
    #region Fields, Properties and Indexers

    public T Value { get; set; }

    #endregion

    #region Ctors

    public ApiDeletedResponse(T value)
    {
        Value = value;
    }

    #endregion
}
