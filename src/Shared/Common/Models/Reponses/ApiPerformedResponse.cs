namespace Common.Models.Reponses;

public sealed class ApiPerformedResponse<T>
{
    #region Fields, Properties and Indexers

    public T Result { get; set; }

    #endregion

    #region Ctors

    public ApiPerformedResponse(T result)
    {
        Result = result;
    }

    #endregion
}
