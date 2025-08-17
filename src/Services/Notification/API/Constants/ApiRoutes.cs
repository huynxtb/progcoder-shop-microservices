namespace User.Api.Constants;

public sealed class ApiRoutes
{
    public static class User
    {
        #region Constants

        public const string Tags = "Users";

        private const string Base = "/users";

        public const string Create = Base;

        public const string Update = Base;

        public const string UpdateStatus = $"{Base}/{{userId}}/status";

        public const string Delete = $"{Base}/{{userId}}";

        public const string GetById = $"{Base}/{{userId}}";

        public const string GetCurrentUserInfo = $"{Base}/me";

        public const string GetUsers = Base;

        public const string Register = $"{Base}/register";

        #endregion
    }
}
