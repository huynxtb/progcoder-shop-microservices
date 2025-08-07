#region using

using Newtonsoft.Json;

#endregion

namespace Application.Models.Response;

public class AccessTokenResponse
{
    #region Fields, Properties and Indexers

    [JsonProperty("access_token")]
    public string? AccessToken { get; set; }

    [JsonProperty("expires_in")]
    public int ExpiresIn { get; set; }

    [JsonProperty("refresh_expires_in")]
    public int RefreshExpiresIn { get; set; }

    [JsonProperty("token_type")]
    public string? TokenType { get; set; }

    [JsonProperty("id_token")]
    public string? IdToken { get; set; }

    [JsonProperty("not-before-policy")]
    public int NotBeforePolicy { get; set; }

    [JsonProperty("scope")]
    public string? Scope { get; set; }

    #endregion
}
