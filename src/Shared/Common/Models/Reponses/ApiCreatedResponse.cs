namespace Common.Models.Reponses;

public sealed class ApiCreatedResponse<T>
{
    #region Fields, Properties and Indexers

    public T Value { get; set; } = default!;

    #endregion

    #region Ctors

    public ApiCreatedResponse() { }

    public ApiCreatedResponse(T value)
    {
        Value = value;
    }

    #endregion
}
