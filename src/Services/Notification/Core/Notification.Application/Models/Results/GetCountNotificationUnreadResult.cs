namespace Notification.Application.Models.Results;

public sealed class GetCountNotificationUnreadResult
{
    #region Fields, Properties and Indexers

    public long Count { get; set; }

    #endregion

    #region Ctors

    public GetCountNotificationUnreadResult(long count)
    {
        Count = count;
    }

    #endregion
}

