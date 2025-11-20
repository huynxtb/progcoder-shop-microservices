namespace Common.Configurations;

public sealed class ApiClientCfg
{
    public static class Catalog
    {
        #region Constants

        public const string Section = "ApiClients:Catalog";

        public const string BaseUrl = "BaseUrl";

        #endregion
    }

    public static class Keycloak
    {
        #region Constants

        public const string Section = "ApiClients:Keycloak";

        public const string BaseUrl = "BaseUrl";

        public const string Realm = "Realm";

        public const string ClientId = "ClientId";

        public const string ClientSecret = "ClientSecret";

        public const string Scopes = "Scopes";

        public const string GrantType = "GrantType";

        #endregion
    }

}
