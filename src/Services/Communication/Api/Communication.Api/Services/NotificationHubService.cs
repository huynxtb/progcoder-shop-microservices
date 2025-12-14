#region using

using Communication.Api.Hubs;
using Communication.Api.Models;
using Microsoft.AspNetCore.SignalR;

#endregion

namespace Communication.Api.Services;

public sealed class NotificationHubService : INotificationHubService
{
    #region Fields, Properties and Indexers

    private readonly IHubContext<NotificationHub> _hubContext;

    private readonly ILogger<NotificationHubService> _logger;

    private const string UserGroupPrefix = "user_";

    private const string ReceiveNotificationMethod = "ReceiveNotification";

    #endregion

    #region Ctors

    public NotificationHubService(
        IHubContext<NotificationHub> hubContext,
        ILogger<NotificationHubService> logger)
    {
        _hubContext = hubContext;
        _logger = logger;
    }

    #endregion

    #region Implementations

    public async Task BroadcastNotificationAsync(NotificationDto notification, CancellationToken cancellationToken = default)
    {
        try
        {
            notification.Timestamp = DateTimeOffset.UtcNow;
            await _hubContext.Clients.All.SendAsync(ReceiveNotificationMethod, notification, cancellationToken);
            _logger.LogInformation("Broadcast notification sent: {Type} - {Title}", notification.Type, notification.Title);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error broadcasting notification: {Type} - {Title}", notification.Type, notification.Title);
        }
    }

    public async Task SendToUserAsync(string userId, NotificationDto notification, CancellationToken cancellationToken = default)
    {
        try
        {
            if (string.IsNullOrEmpty(userId))
            {
                _logger.LogWarning("Cannot send notification to user: userId is null or empty");
                return;
            }

            notification.Timestamp = DateTimeOffset.UtcNow;
            notification.UserId = userId;
            var groupName = $"{UserGroupPrefix}{userId}";
            await _hubContext.Clients.Group(groupName).SendAsync(ReceiveNotificationMethod, notification, cancellationToken);
            _logger.LogInformation("Notification sent to user {UserId}: {Type} - {Title}", userId, notification.Type, notification.Title);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error sending notification to user {UserId}: {Type} - {Title}", userId, notification.Type, notification.Title);
        }
    }

    public async Task SendToUsersAsync(List<string> userIds, NotificationDto notification, CancellationToken cancellationToken = default)
    {
        try
        {
            if (userIds == null || userIds.Count == 0)
            {
                _logger.LogWarning("Cannot send notification to users: userIds list is null or empty");
                return;
            }

            notification.Timestamp = DateTimeOffset.UtcNow;
            var tasks = userIds.Select(userId =>
            {
                var groupName = $"{UserGroupPrefix}{userId}";
                return _hubContext.Clients.Group(groupName).SendAsync(ReceiveNotificationMethod, notification, cancellationToken);
            });

            await Task.WhenAll(tasks);
            _logger.LogInformation("Notification sent to {Count} users: {Type} - {Title}", userIds.Count, notification.Type, notification.Title);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error sending notification to multiple users: {Type} - {Title}", notification.Type, notification.Title);
        }
    }

    #endregion
}
