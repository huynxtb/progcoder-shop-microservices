#region using

using System.Text.Json.Serialization;

#endregion

namespace Notification.Domain.Models.Externals.Discord;

public sealed class DiscordWebhookPayload
{
    #region Fields, Properties and Indexers

    [JsonPropertyName("username")]
    public string? Username { get; set; }

    [JsonPropertyName("avatar_url")]
    public string? AvatarUrl { get; set; }

    [JsonPropertyName("embeds")]
    public List<DiscordEmbed> Embeds { get; set; } = [];

    #endregion
}

public sealed class DiscordEmbed
{
    #region Fields, Properties and Indexers

    [JsonPropertyName("title")]
    public string? Title { get; set; }

    [JsonPropertyName("color")]
    public int Color { get; set; }

    [JsonPropertyName("url")]
    public string? Url { get; set; }

    [JsonPropertyName("description")]
    public string? Description { get; set; }

    #endregion
}

