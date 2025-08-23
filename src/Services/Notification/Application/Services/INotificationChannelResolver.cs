#region using

using Notification.Domain.Enums;

#endregion

namespace Notification.Application.Services;

public interface INotificationChannelResolver
{
    #region Methods

    INotificationStartegyService Resolve(ChannelType channel);

    #endregion
}
