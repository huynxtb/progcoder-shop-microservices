namespace SourceCommon.Configurations;

public class AuthorizationOptions
{
    #region Constants

    public const string Section = "AuthorizationServer";

    #endregion

    #region Fields, Properties and Indexers

    public string? Authority { get; set; }

    public string? Audience { get; set; }

    public string? ClientId { get; set; }

    public string? ClientSecret { get; set; }

    public string[]? Scopes { get; set; }

    public bool RequireHttpsMetadata { get; set; }

    public string? OAuth2RedirectUrl { get; set; }

    #endregion
}
