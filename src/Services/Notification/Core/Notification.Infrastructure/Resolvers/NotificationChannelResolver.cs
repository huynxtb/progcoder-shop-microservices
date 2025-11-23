#region using

using Notification.Application.Strategy;
using Notification.Domain.Enums;

#endregion

namespace Notification.Infrastructure.Resolvers;

public sealed class NotificationChannelResolver : INotificationSenderResolver
{
    #region Fields, Properties and Indexers

    private readonly IReadOnlyDictionary<ChannelType, INotificationSender> _map;

    #endregion

    #region Ctors

    public NotificationChannelResolver(IEnumerable<INotificationSender> channels) 
        => _map = channels.ToDictionary(c => c.Channel);

    #endregion

    #region Implementations

    public INotificationSender Resolve(ChannelType channel) =>
        _map.TryGetValue(channel, out var impl)
            ? impl
            : throw new InfrastructureException($"No channel registered for {channel}.");

    #endregion
}
