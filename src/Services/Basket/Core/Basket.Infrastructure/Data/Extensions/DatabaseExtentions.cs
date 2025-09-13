#region using

using Basket.Infrastructure.Constants;
using BuildingBlocks.Abstractions.ValueObjects;
using Microsoft.AspNetCore.Builder;
using MongoDB.Driver;

#endregion

namespace Basket.Infrastructure.Data.Extensions;

public static class DatabaseExtentions
{
    #region Methods

    public static async Task EnsureIndexesAsync(this WebApplication app)
    {
        //var db = app.Services.GetRequiredService<IMongoDatabase>();
        //var notif = db.GetCollection<NotificationEntity>(MongoCollection.Notification);
        //var deliv = db.GetCollection<DeliveryEntity>(MongoCollection.Delivery);
        //var tmpl = db.GetCollection<TemplateEntity>(MongoCollection.Template);

        //await notif.Indexes.CreateOneAsync(new CreateIndexModel<NotificationEntity>(
        //Builders<Domain.Entities.NotificationEntity>.IndexKeys
        //    .Ascending(x => x.UserId)
        //    .Ascending(x => x.IsRead)
        //    .Descending(x => x.CreatedOnUtc)));

        //await deliv.Indexes.CreateOneAsync(new CreateIndexModel<DeliveryEntity>(
        //    Builders<DeliveryEntity>.IndexKeys
        //        .Ascending(x => x.Status)
        //        .Ascending(x => x.NextAttemptUtc)
        //        .Descending(x => x.Priority)
        //        .Ascending(x => x.CreatedOnUtc)));

        //await tmpl.Indexes.CreateOneAsync(new CreateIndexModel<TemplateEntity>(
        //    Builders<TemplateEntity>.IndexKeys
        //        .Ascending(x => x.Key)
        //        .Ascending(x => x.Channel),
        //    new CreateIndexOptions { Unique = true }));
    }

    #endregion
}
