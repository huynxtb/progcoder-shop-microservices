namespace Common.Models.Reponses;

public sealed class ResultSharedResponse<T> where T : class
{
    #region Fields, Properties and Indexers

    public T Data { get; set; } = default!;

    public string? Message { get; set; }

    public int StatusCode { get; set; }

    public string? Instance { get; set; }

    public List<ErrorResult>? Errors { get; set; }

    #endregion

    #region Ctors

    public ResultSharedResponse()
    {
    }

    public ResultSharedResponse(
        T data,
        string message,
        int statusCode,
        string? instance,
        List<ErrorResult>? errors)
    {
        Data = data;
        Message = message;
        StatusCode = statusCode;
        Instance = instance;
        Errors = errors;
    }

    public ResultSharedResponse(
        int statusCode,
        string? instance,
        List<ErrorResult>? errors,
        string? message)
    {
        StatusCode = statusCode;
        Instance = instance;
        Errors = errors;
        Message = message;
    }

    #endregion

    #region Methods

    public static ResultSharedResponse<T> Failure(
        int statusCode = 400,
        string? instance = null,
        List<ErrorResult>? errors = null,
        string? message = null)
    {
        return new ResultSharedResponse<T>(statusCode, instance, errors, message);
    }

    public static ResultSharedResponse<T> Success(
        T data,
        string message,
        string? instance = null)
    {
        return new ResultSharedResponse<T>(data, message, 200, instance, null);
    }

    #endregion

}
