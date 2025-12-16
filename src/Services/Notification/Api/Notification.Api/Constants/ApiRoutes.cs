namespace Notification.Api.Constants;

public sealed class ApiRoutes
{
    public static class Notification
    {
        #region Constants

        public const string Tags = "Notifications";

        private const string Base = "/notifications";

        public const string MarkAsRead = $"{Base}/read";

        public const string GetNotifications = Base;

        public const string GetAllNotifications = $"{Base}/all";

        public const string GetCountUnread = $"{Base}/unread/count";

        public const string GetTop10Unread = $"{Base}/unread/top10";

        #endregion
    }
}
