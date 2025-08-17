#region using

using System.Text.Json.Serialization;

#endregion

namespace User.Application.Models.Responses;

public sealed class KeycloakUserResponse
{
    #region Fields, Properties and Indexers

    [JsonPropertyName("id")]
    public string? Id { get; set; }

    [JsonPropertyName("createdTimestamp")]
    public long CreatedTimestamp { get; set; }

    [JsonPropertyName("username")]
    public string? Username { get; set; }

    [JsonPropertyName("enabled")]
    public bool Enabled { get; set; }

    [JsonPropertyName("totp")]
    public bool Totp { get; set; }

    [JsonPropertyName("emailVerified")]
    public bool EmailVerified { get; set; }

    [JsonPropertyName("firstName")]
    public string? FirstName { get; set; }

    [JsonPropertyName("lastName")]
    public string? LastName { get; set; }

    [JsonPropertyName("email")]
    public string? Email { get; set; }

    [JsonPropertyName("notBefore")]
    public int NotBefore { get; set; }

    #endregion
}
