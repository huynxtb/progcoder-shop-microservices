namespace Notification.Api.Constants;

public sealed class ApiRoutes
{
    public static class Notification
    {
        #region Constants

        public const string Tags = "Notifications";

        private const string Base = "/notifications";

        public const string MarkAsRead = $"{Base}/{{notificationId}}/read";

        public const string GetNotifications = Base;

        #endregion
    }
}
