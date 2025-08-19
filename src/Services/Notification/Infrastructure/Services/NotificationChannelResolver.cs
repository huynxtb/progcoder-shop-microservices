#region using

using Notification.Application.Services;
using Notification.Domain.Enums;

#endregion

namespace Notification.Infrastructure.Services;

public class NotificationChannelResolver : INotificationChannelResolver
{
    #region Fields, Properties and Indexers

    private readonly IReadOnlyDictionary<ChannelType, INotificationChannel> map;

    #endregion

    #region Ctors

    public NotificationChannelResolver(IEnumerable<INotificationChannel> channels) 
        => map = channels.ToDictionary(c => c.Channel);

    #endregion

    #region Implementations

    public INotificationChannel Resolve(ChannelType channel) =>
        map.TryGetValue(channel, out var impl)
            ? impl
            : throw new InfrastructureException($"No channel registered for {channel}.");

    #endregion
}
