#region using

using System.Text.Json.Serialization;

#endregion

namespace Application.Dtos.Keycloaks;

public class KcUserDto
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
    public List<KcCredential> Credentials { get; set; } = [];

    #endregion
}