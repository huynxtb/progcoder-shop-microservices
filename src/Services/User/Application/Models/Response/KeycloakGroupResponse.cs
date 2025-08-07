#region using

using Newtonsoft.Json;

#endregion

namespace Application.Models.Response;

public class KeycloakGroupResponse
{
    #region Fields, Properties and Indexers

    [JsonProperty("id")]
    public string? Id { get; set; }

    [JsonProperty("name")]
    public string? Name { get; set; }

    [JsonProperty("path")]
    public string? Path { get; set; }

    #endregion
}
