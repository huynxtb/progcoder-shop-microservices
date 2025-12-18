namespace Common.Models.Reponses;

public sealed class ApiDeletedResponse<T>
{
    #region Fields, Properties and Indexers

    public T Value { get; set; } = default!;

    #endregion

    #region Ctors

    public ApiDeletedResponse() { }

    public ApiDeletedResponse(T value)
    {
        Value = value;
    }

    #endregion
}
