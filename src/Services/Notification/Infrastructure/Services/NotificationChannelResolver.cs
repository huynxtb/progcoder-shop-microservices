#region using

using Notification.Application.Services;
using Notification.Domain.Enums;

#endregion

namespace Notification.Infrastructure.Services;

public sealed class NotificationChannelResolver : INotificationChannelResolver
{
    #region Fields, Properties and Indexers

    private readonly IReadOnlyDictionary<ChannelType, INotificationStartegyService> map;

    #endregion

    #region Ctors

    public NotificationChannelResolver(IEnumerable<INotificationStartegyService> channels) 
        => map = channels.ToDictionary(c => c.Channel);

    #endregion

    #region Implementations

    public INotificationStartegyService Resolve(ChannelType channel) =>
        map.TryGetValue(channel, out var impl)
            ? impl
            : throw new InfrastructureException($"No channel registered for {channel}.");

    #endregion
}
