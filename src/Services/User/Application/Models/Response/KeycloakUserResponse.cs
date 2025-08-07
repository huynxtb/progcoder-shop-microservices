#region using

using Newtonsoft.Json;

#endregion

namespace Application.Models.Response;

public class KeycloakUserResponse
{
    #region Fields, Properties and Indexers

    [JsonProperty("id")]
    public string? Id { get; set; }

    [JsonProperty("createdTimestamp")]
    public long CreatedTimestamp { get; set; }

    [JsonProperty("username")]
    public string? Username { get; set; }

    [JsonProperty("enabled")]
    public bool Enabled { get; set; }

    [JsonProperty("totp")]
    public bool Totp { get; set; }

    [JsonProperty("emailVerified")]
    public bool EmailVerified { get; set; }

    [JsonProperty("firstName")]
    public string? FirstName { get; set; }

    [JsonProperty("lastName")]
    public string? LastName { get; set; }

    [JsonProperty("email")]
    public string? Email { get; set; }

    [JsonProperty("notBefore")]
    public int NotBefore { get; set; }

    #endregion
}
