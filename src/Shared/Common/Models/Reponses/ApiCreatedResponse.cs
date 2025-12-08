namespace Common.Models.Reponses;

public sealed class ApiCreatedResponse<T>
{
    #region Fields, Properties and Indexers

    public T Value { get; set; }

    #endregion

    #region Ctors

    public ApiCreatedResponse(T value)
    {
        Value = value;
    }

    #endregion
}
