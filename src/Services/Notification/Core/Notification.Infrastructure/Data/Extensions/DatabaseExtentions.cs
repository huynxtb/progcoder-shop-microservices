#region using

using Common.ValueObjects;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using MongoDB.Driver;
using Notification.Application.Constants;
using Notification.Domain.Entities;
using Notification.Infrastructure.Constants;

#endregion

namespace Notification.Infrastructure.Data.Extensions;

public static class DatabaseExtentions
{
    #region Methods

    public static async Task InitialiseDatabaseAsync(this WebApplication app)
    {
        var db = app.Services.GetRequiredService<IMongoDatabase>();
        var collection = db.GetCollection<TemplateEntity>(MongoCollection.Template);

        var models = new List<WriteModel<TemplateEntity>>();
        var docs = new List<TemplateEntity>()
        {
            TemplateEntity.Create(
                id: Guid.Parse("c63f5f8d-daba-409f-88f9-fc3a9eb3e7e1"),
                key: TemplateKey.ProductUpserted,
                channel: Domain.Enums.ChannelType.InApp,
                subject: "Product Have Updated",
                isHtml: false,
                body: "The product #PRODUCT_NAME# has updated by #PERFORM_BY#",
                performedBy: Actor.System(AppConstants.Service.Notification).ToString()),

            TemplateEntity.Create(
                id: Guid.Parse("c63f5f8d-daba-409f-88f9-fc3a9eb3e7e2"),
                key: TemplateKey.ProductUpserted,
                channel: Domain.Enums.ChannelType.Discord,
                subject: "Product Have Updated",
                isHtml: false,
                body: "The product #PRODUCT_NAME# has updated by #PERFORM_BY#",
                performedBy: Actor.System(AppConstants.Service.Notification).ToString()),

            TemplateEntity.Create(
                id: Guid.Parse("c63f5f8d-daba-409f-88f9-fc3a9eb3e7e3"),
                key: TemplateKey.ProductUpserted,
                channel: Domain.Enums.ChannelType.Email,
                subject: "Product Have Updated",
                isHtml: true,
                body: "<p>Dear #USERNAME#</p>, <p>The product #PRODUCT_NAME# has updated by #PERFORM_BY#</p> <p>Best Regards,</p> <p>ProG Coder</p>",
                performedBy: Actor.System(AppConstants.Service.Notification).ToString()),
        };

        foreach (var template in docs)
        {
            var filter = Builders<TemplateEntity>.Filter.Eq(x => x.Id, template.Id);
            var replace = new ReplaceOneModel<TemplateEntity>(filter, template)
            {
                IsUpsert = true
            };

            models.Add(replace);
        }

        await collection.BulkWriteAsync(models);
    }

    public static async Task EnsureIndexesAsync(this WebApplication app)
    {
        var db = app.Services.GetRequiredService<IMongoDatabase>();
        var notif = db.GetCollection<NotificationEntity>(MongoCollection.Notification);
        var deliv = db.GetCollection<DeliveryEntity>(MongoCollection.Delivery);
        var tmpl = db.GetCollection<TemplateEntity>(MongoCollection.Template);

        await notif.Indexes.CreateOneAsync(new CreateIndexModel<NotificationEntity>(
        Builders<Domain.Entities.NotificationEntity>.IndexKeys
            .Ascending(x => x.UserId)
            .Ascending(x => x.IsRead)
            .Descending(x => x.CreatedOnUtc)));

        await deliv.Indexes.CreateOneAsync(new CreateIndexModel<DeliveryEntity>(
            Builders<DeliveryEntity>.IndexKeys
                .Ascending(x => x.Status)
                .Ascending(x => x.NextAttemptUtc)
                .Descending(x => x.Priority)
                .Ascending(x => x.CreatedOnUtc)));

        await tmpl.Indexes.CreateOneAsync(new CreateIndexModel<TemplateEntity>(
            Builders<TemplateEntity>.IndexKeys
                .Ascending(x => x.Key)
                .Ascending(x => x.Channel),
            new CreateIndexOptions { Unique = true }));
    }

    #endregion
}
