#region using

using Microsoft.Extensions.Configuration;
using Notification.Application.Models;
using Notification.Application.Services;
using Notification.Domain.Enums;
using SourceCommon.Configurations;

#endregion

namespace Notification.Infrastructure.Chanels;

public sealed class WhatsAppChanel : INotificationChannel
{
    #region Fields, Properties and Indexers

    public ChannelType Channel => ChannelType.WhatsApp;

    private readonly string _baseUrl;

    private readonly string _phoneNumberId;

    private readonly string _accessToken;

    private readonly string _appSecret;

    #endregion

    #region Ctors

    public WhatsAppChanel(IConfiguration cfg)
    {
        _baseUrl = cfg.GetValue<string>($"{NotificationCfg.WhatsAppSettings.Section}:{NotificationCfg.WhatsAppSettings.BaseUrl}")!;
        _phoneNumberId = cfg.GetValue<string>($"{NotificationCfg.WhatsAppSettings.Section}:{NotificationCfg.WhatsAppSettings.PhoneNumberId}")!;
        _accessToken = cfg.GetValue<string>($"{NotificationCfg.WhatsAppSettings.Section}:{NotificationCfg.WhatsAppSettings.AccessToken}")!;
        _appSecret = cfg.GetValue<string>($"{NotificationCfg.WhatsAppSettings.Section}:{NotificationCfg.WhatsAppSettings.AppSecret}")!;
    }

    #endregion

    #region Methods

    public async Task<ChannelResult> SendAsync(NotificationContext context, CancellationToken cancellationToken)
    {
        try
        {
            var to = context.To.First();
            var payload = new
            {
                messaging_product = "whatsapp",
                to,
                type = "text",
                text = new { body = context.Body }
            };

            //using var res = await _http.PostAsJsonAsync(
            //    $"{_opt.PhoneNumberId}/messages", payload, ct);

            //res.EnsureSuccessStatusCode();
            //var doc = await res.Content.ReadFromJsonAsync<JsonElement>(cancellationToken: cancellationToken);

            await Task.CompletedTask;

            return ChannelResult.Success();
        }
        catch (Exception ex)
        {
            return ChannelResult.Failure(ex.Message);
        }
    }

    #endregion
}
