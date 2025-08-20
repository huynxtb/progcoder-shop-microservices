#region using

using MongoDB.Driver;
using Notification.Application.Data.Repositories;
using Notification.Domain.Entities;
using Notification.Domain.Enums;

#endregion

namespace Notification.Infrastructure.Data.Repositories;

public sealed class NotificationTemplateRepository(IMongoCollection<NotificationTemplate> collection) 
    : IQueryNotificationTemplateRepository
{
    #region Implementations

    public async Task<NotificationTemplate> GetAsync(
        string key, 
        ChannelType channel, 
        CancellationToken cancellationToken = default)
    {
        return await collection.Find(x => x.Key == key && x.Channel == channel)
            .FirstOrDefaultAsync(cancellationToken);
    }

    #endregion
}
