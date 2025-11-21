namespace Common.Configurations;

public static class NotificationCfg
{
    public static class EmailSettings
    {
        #region Constants

        public const string Section = "NotificationChanelConfig:EmailSettings";

        public const string SmtpServer = "SmtpServer";

        public const string SmtpPort = "SmtpPort";

        public const string FromAddress = "FromAddress";

        public const string FromName = "FromName";

        public const string Username = "Username";

        public const string Password = "Password";

        public const string EnableSsl = "EnableSsl";

        public const string TimeoutMs = "TimeoutMs"; 

        #endregion
    }

    public static class WhatsAppSettings
    {
        #region Constants

        public const string Section = "NotificationChanelConfig:WhatsAppSettings";

        public const string BaseUrl = "BaseUrl";

        public const string PhoneNumberId = "PhoneNumberId";

        public const string AccessToken = "AccessToken";

        public const string AppSecret = "AppSecret";

        #endregion
    }

    public static class DiscordSettings
    {
        #region Constants

        public const string Section = "NotificationChanelConfig:DiscordSettings";

        public const string BaseUrl = "BaseUrl";

        public const string WebhookId = "WebhookId";

        public const string WebhookToken = "WebhookToken";

        public const string BotName = "BotName";

        public const string AvatarUrl = "AvatarUrl";

        public const string Url = "Url";

        #endregion
    }
}
