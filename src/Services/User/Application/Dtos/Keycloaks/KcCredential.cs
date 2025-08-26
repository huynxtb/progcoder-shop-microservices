#region using

using System.Text.Json.Serialization;

#endregion

namespace User.Application.Dtos.Keycloaks;

public class KcCredential
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