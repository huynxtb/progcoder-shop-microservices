namespace Common.Models.Reponses;

public sealed class ApiPerformedResponse<T>
{
    #region Fields, Properties and Indexers

    public T Result { get; set; } = default!;

    #endregion

    #region Ctors

    public ApiPerformedResponse() { }

    public ApiPerformedResponse(T result)
    {
        Result = result;
    }

    #endregion
}
