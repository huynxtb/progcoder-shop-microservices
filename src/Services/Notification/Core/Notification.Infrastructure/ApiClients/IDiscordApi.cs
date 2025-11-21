#region using

using Notification.Domain.Models.Externals.Discord;
using Refit;

#endregion

namespace Notification.Infrastructure.ApiClients;

public interface IDiscordApi
{
    #region Methods

    [Post("/api/webhooks/{webhookId}/{webhookToken}")]
    Task<ApiResponse<object>> SendMessageAsync(
        [AliasAs("webhookId")] string webhookId,
        [AliasAs("webhookId")] string webhookToken,
        [Body] DiscordWebhookPayload payload);

    #endregion
}

