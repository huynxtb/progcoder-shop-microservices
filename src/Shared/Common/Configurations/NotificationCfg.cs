namespace Common.Configurations;

public class NotificationCfg
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
}
