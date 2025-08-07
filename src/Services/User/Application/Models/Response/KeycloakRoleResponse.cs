#region using

using Newtonsoft.Json;

#endregion

namespace Application.Models.Response;

public class KeycloakRoleResponse
{
    #region Fields, Properties and Indexers

    [JsonProperty("id")]
    public string? Id { get; set; }

    [JsonProperty("name")]
    public string? Name { get; set; }

    [JsonProperty("description")]
    public string? Description { get; set; }

    [JsonProperty("composite")]
    public bool Composite { get; set; }

    [JsonProperty("clientRole")]
    public bool ClientRole { get; set; }

    [JsonProperty("containerId")]
    public string? ContainerId { get; set; }

    #endregion
}
