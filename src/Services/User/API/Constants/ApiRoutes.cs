namespace API.Constants;

public sealed class ApiRoutes
{
    public static class User
    {
        #region Constants

        public const string Tags = "Users";

        public const string Base = "/users";

        public const string GetById = $"{Base}/{{id}}";

        #endregion
    }
}
