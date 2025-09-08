#region using

using Notification.Application.Resolvers;
using Notification.Application.Services;
using Notification.Domain.Enums;

#endregion

namespace Notification.Infrastructure.Resolvers;

public sealed class NotificationChannelResolver : INotificationChannelResolver
{
    #region Fields, Properties and Indexers

    private readonly IReadOnlyDictionary<ChannelType, INotificationStartegyService> _map;

    #endregion

    #region Ctors

    public NotificationChannelResolver(IEnumerable<INotificationStartegyService> channels) 
        => _map = channels.ToDictionary(c => c.Channel);

    #endregion

    #region Implementations

    public INotificationStartegyService Resolve(ChannelType channel) =>
        _map.TryGetValue(channel, out var impl)
            ? impl
            : throw new InfrastructureException($"No channel registered for {channel}.");

    #endregion
}
