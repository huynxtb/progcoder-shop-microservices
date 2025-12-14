#region using

using Communication.Api.Models;

#endregion

namespace Communication.Api.Services;

public interface INotificationHubService
{
    #region Methods

    Task BroadcastNotificationAsync(NotificationDto notification, CancellationToken cancellationToken = default);

    Task SendToUserAsync(string userId, NotificationDto notification, CancellationToken cancellationToken = default);

    Task SendToUsersAsync(List<string> userIds, NotificationDto notification, CancellationToken cancellationToken = default);

    #endregion
}
