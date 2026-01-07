#region using

using Common.ValueObjects;
using Common.Constants;
using Notification.Application.Data.Repositories;
using Notification.Application.Models;
using Notification.Application.Strategy;
using Notification.Domain.Entities;
using Notification.Domain.Enums;

#endregion

namespace Notification.Infrastructure.Senders;

public sealed class InAppNotificationSender(ICommandNotificationRepository repository) : INotificationSender
{
    #region Fields, Properties and Indexers

    public ChannelType Channel => ChannelType.InApp;

    #endregion

    #region Methods

    public async Task<ChannelResult> SendAsync(NotificationContext context, CancellationToken cancellationToken)
    {
        try
        {
            foreach (var to in context.To)
            {
                var notification = NotificationEntity.Create(id: Guid.NewGuid(),
                    userId: Guid.Parse(to),
                    title: context.Subject!,
                    message: context.Body!,
                    performedBy: Actor.Worker(AppConstants.Service.Notification).ToString());

                if (!string.IsNullOrWhiteSpace(context.TargetUrl))
                {
                    notification.UpdateTargetUrl(context.TargetUrl!, Actor.Worker(AppConstants.Service.Notification).ToString());
                }

                await repository.UpsertAsync(notification, cancellationToken);
            }

            return ChannelResult.Success();
        }
        catch (Exception ex)
        {
            return ChannelResult.Failure(ex.Message);
        }
    }

    #endregion
}
