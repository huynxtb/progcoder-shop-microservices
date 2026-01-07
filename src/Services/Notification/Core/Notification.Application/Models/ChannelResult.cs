namespace Notification.Application.Models;

public sealed class ChannelResult
{
    #region Fields, Properties and Indexers

    public bool IsSuccess { get; }

    public string? ProviderMessageId { get; }

    public string? ErrorMessage { get; }

    #endregion

    #region Ctors

    private ChannelResult(bool ok, string? id = null, string? msg = null)
    {
        IsSuccess = ok; ProviderMessageId = id; ErrorMessage = msg;
    }

    #endregion

    #region Methods

    public static ChannelResult Success(string? providerMessageId = null) =>
        new(true, providerMessageId);

    public static ChannelResult Failure(string errorMessage) =>
        new(false, null, errorMessage);

    #endregion

}