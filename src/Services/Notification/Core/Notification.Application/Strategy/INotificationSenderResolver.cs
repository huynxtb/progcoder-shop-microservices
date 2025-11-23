#region using

using Notification.Domain.Enums;

#endregion

namespace Notification.Application.Strategy;

public interface INotificationSenderResolver
{
    #region Methods

    INotificationSender Resolve(ChannelType channel);

    #endregion
}
