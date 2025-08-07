namespace SourceCommon.Configurations;

public class KeycloakApiOptions
{
    #region Constants

    public const string Section = "ApiClients:Keycloak";

    #endregion

    #region Fields, Properties and Indexers
    public string? BaseUrl { get; set; }

    public string? Realm { get; set; }

    public string? ClientId { get; set; }

    public string? ClientSecret { get; set; }

    public bool RequireHttpsMetadata { get; set; } = true;

    #endregion
}