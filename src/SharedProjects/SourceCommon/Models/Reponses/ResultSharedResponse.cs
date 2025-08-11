namespace SourceCommon.Models.Reponses;

public sealed class ResultSharedResponse<T> where T : class
{
    #region Fields, Properties and Indexers

    public T Data { get; private set; } = default!;

    public string? Message { get; private set; }

    public int StatusCode { get; private set; }

    public string? Instance { get; private set; }

    public List<ErrorDetail>? Errors { get; private set; }

    #endregion

    #region Ctors

    private ResultSharedResponse(
        T data,
        string message,
        int statusCode,
        string instance,
        List<ErrorDetail>? errors)
    {
        Data = data;
        Message = message;
        StatusCode = statusCode;
        Instance = instance;
        Errors = errors;
    }

    private ResultSharedResponse(
        int statusCode,
        string instance,
        List<ErrorDetail>? errors,
        string? message)
    {
        StatusCode = statusCode;
        Instance = instance;
        Errors = errors;
        Message = message;
    }

    #endregion

    #region Static Methods

    public static ResultSharedResponse<T> Failure(
        int statusCode = 400,
        string instance = "",
        List<ErrorDetail>? errors = null,
        string? message = "")
    {
        return new ResultSharedResponse<T>(statusCode, instance, errors, message);
    }

    public static ResultSharedResponse<T> Success(
        T data,
        string message,
        string instance = "")
    {
        return new ResultSharedResponse<T>(data, message, 200, instance, null);
    }

    #endregion

}
