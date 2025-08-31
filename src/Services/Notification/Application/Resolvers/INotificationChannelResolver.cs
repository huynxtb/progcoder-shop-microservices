#region using

using Notification.Application.Services;
using Notification.Domain.Enums;

#endregion

namespace Notification.Application.Resolvers;

public interface INotificationChannelResolver
{
    #region Methods

    INotificationStartegyService Resolve(ChannelType channel);

    #endregion
}
