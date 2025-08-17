#region using

using System.Text.Json.Serialization;

#endregion

namespace User.Application.Models.Responses;

public sealed class KeycloakRoleResponse
{
    #region Fields, Properties and Indexers

    [JsonPropertyName("id")]
    public string? Id { get; set; }

    [JsonPropertyName("name")]
    public string? Name { get; set; }

    [JsonPropertyName("description")]
    public string? Description { get; set; }

    [JsonPropertyName("composite")]
    public bool Composite { get; set; }

    [JsonPropertyName("clientRole")]
    public bool ClientRole { get; set; }

    [JsonPropertyName("containerId")]
    public string? ContainerId { get; set; }

    #endregion
}
