namespace User.Api.Constants;

public sealed class ApiRoutes
{
    public static class User
    {
        #region Constants

        public const string Tags = "Users";

        private const string Base = "/users";

        public const string Create = Base;

        public const string UpdateStatus = $"{Base}/{{userId}}/status";

        public const string Delete = $"{Base}/{{userId}}";

        public const string GetById = $"{Base}/{{userId}}";

        public const string GetCurrentUserInfo = $"{Base}/me";

        public const string UpdateCurrentUser = $"{Base}/me";

        public const string GetUsers = Base;

        public const string Register = $"{Base}/register";

        #endregion
    }

    public static class LoginHistory
    {
        #region Constants

        public const string Tags = "LoginHistories";

        private const string Base = "/login-histories";

        public const string GetLoginHistories = Base;

        #endregion
    }

    public static class Keycloak
    {
        #region Constants

        public const string Tags = "Keycloaks";

        private const string Base = "/keycloaks";

        public const string UserEvents = $"{Base}/user-events/{{apiKey}}";

        public const string SyncRole = $"{Base}/roles/sync";


        #endregion
    }
}
