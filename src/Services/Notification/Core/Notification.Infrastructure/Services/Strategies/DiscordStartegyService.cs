#region using

using Microsoft.Extensions.Configuration;
using Notification.Application.Models;
using Notification.Application.Services;
using Notification.Domain.Enums;
using Notification.Domain.Models.Externals.Discord;
using Notification.Infrastructure.ApiClients;
using Common.Configurations;
using Refit;

#endregion

namespace Notification.Infrastructure.Services.Strategies;

public sealed class DiscordStartegyService : INotificationStartegyService
{
    #region Fields, Properties and Indexers

    public ChannelType Channel => ChannelType.Discord;

    private readonly IDiscordApi _discordApi;

    private readonly string _webhookId;

    private readonly string _webhookToken;

    private readonly string _botName;

    private readonly string _avatarUrl;

    private readonly string _url;

    #endregion

    #region Ctors

    public DiscordStartegyService(
        IConfiguration cfg,
        IDiscordApi discordApi)
    {
        _webhookId = cfg.GetValue<string>($"{NotificationCfg.DiscordSettings.Section}:{NotificationCfg.DiscordSettings.WebhookId}")!;
        _webhookToken = cfg.GetValue<string>($"{NotificationCfg.DiscordSettings.Section}:{NotificationCfg.DiscordSettings.WebhookToken}")!;
        _botName = cfg.GetValue<string>($"{NotificationCfg.DiscordSettings.Section}:{NotificationCfg.DiscordSettings.BotName}")!;
        _avatarUrl = cfg.GetValue<string>($"{NotificationCfg.DiscordSettings.Section}:{NotificationCfg.DiscordSettings.AvatarUrl}")!;
        _url = cfg.GetValue<string>($"{NotificationCfg.DiscordSettings.Section}:{NotificationCfg.DiscordSettings.Url}")!;
        _discordApi = discordApi;
    }

    #endregion

    #region Methods

    public async Task<ChannelResult> SendAsync(NotificationContext context, CancellationToken cancellationToken)
    {
        try
        {
            var payload = new DiscordWebhookPayload
            {
                Username = _botName,
                AvatarUrl = _avatarUrl,
                Embeds = new List<DiscordEmbed>
                {
                    new DiscordEmbed
                    {
                        Title = context.Subject,
                        Color = (int)DiscordColor.Green,
                        Url = _url,
                        Description = context.Body
                    }
                }
            };

            var response = await _discordApi.SendMessageAsync(_webhookId, _webhookToken, payload);

            if (response.IsSuccessStatusCode)
            {
                return ChannelResult.Success();
            }

            var errorMessage = response.Error?.Content ?? response.StatusCode.ToString();
            return ChannelResult.Failure($"Discord API error: {response.StatusCode} - {errorMessage}");
        }
        catch (Exception ex)
        {
            return ChannelResult.Failure(ex.Message);
        }
    }

    #endregion
}

