#region using

using System.Text.Json.Serialization;

#endregion

namespace Notification.Domain.Models.Externals.Keycloaks;

public sealed class KeycloakAccessToken
{
    #region Fields, Properties and Indexers

    [JsonPropertyName("access_token")]
    public string? AccessToken { get; set; }

    [JsonPropertyName("expires_in")]
    public int ExpiresIn { get; set; }

    [JsonPropertyName("refresh_expires_in")]
    public int RefreshExpiresIn { get; set; }

    [JsonPropertyName("token_type")]
    public string? TokenType { get; set; }

    [JsonPropertyName("id_token")]
    public string? IdToken { get; set; }

    [JsonPropertyName("not-before-policy")]
    public int NotBeforePolicy { get; set; }

    [JsonPropertyName("scope")]
    public string? Scope { get; set; }

    #endregion
}
