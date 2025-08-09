#region using

using System.Text.Json.Serialization;

#endregion

namespace Application.Dtos.Keycloaks;

public class KeycloakUserDto
{
    #region Fields, Properties and Indexers

    [JsonPropertyName("username")]
    public string? UserName { get; set; }

    [JsonPropertyName("email")]
    public string? Email { get; set; }

    [JsonPropertyName("firstName")]
    public string? FirstName { get; set; }

    [JsonPropertyName("lastName")]
    public string? LastName { get; set; }

    [JsonPropertyName("enabled")]
    public bool Enabled { get; set; } = true;

    [JsonPropertyName("credentials")]
    public List<KeycloakCredential> Credentials { get; set; } = [];

    #endregion
}

public sealed class KeycloakCredential
{
    #region Fields, Properties and Indexers

    [JsonPropertyName("type")]
    public string? Type { get; set; }

    [JsonPropertyName("value")]
    public string? Value { get; set; }

    [JsonPropertyName("temporary")]
    public bool Temporary { get; set; } = false;

    #endregion
}