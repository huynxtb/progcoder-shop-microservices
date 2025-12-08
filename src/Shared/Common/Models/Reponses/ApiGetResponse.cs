namespace Common.Models.Reponses;

public sealed class ApiGetResponse<T>
{
    #region Fields, Properties and Indexers

    public T Result { get; set; }

    #endregion

    #region Ctors

    public ApiGetResponse(T result)
    {
        Result = result;
    }

    #endregion
}
