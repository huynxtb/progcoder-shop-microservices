#region using

using MongoDB.Driver;
using Notification.Application.Data.Repositories;
using Notification.Domain.Entities;
using Notification.Domain.Enums;
using Notification.Infrastructure.Constants;

#endregion

namespace Notification.Infrastructure.Data.Repositories;

public sealed class TemplateRepository : IQueryTemplateRepository
{
    #region Fields, Properties and Indexers

    private readonly IMongoCollection<TemplateEntity> _collection;

    #endregion

    #region Ctors

    public TemplateRepository(IMongoDatabase db)
    {
        _collection = db.GetCollection<TemplateEntity>(MongoCollection.Template);
    }

    #endregion

    #region Implementations

    public async Task<TemplateEntity> GetAsync(
        string key, 
        ChannelType channel, 
        CancellationToken cancellationToken = default)
    {
        return await _collection.Find(x => x.Key == key && x.Channel == channel)
            .FirstOrDefaultAsync(cancellationToken);
    }

    #endregion
}
