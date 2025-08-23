#region using

using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using MongoDB.Driver;
using Notification.Application.Constants;
using Notification.Domain.Entities;
using Notification.Infrastructure.Constants;
using SourceCommon.Constants;

#endregion

namespace Notification.Infrastructure.Data.Extensions;

public static class DatabaseExtentions
{
    #region Methods

    public static async Task InitialiseDatabaseAsync(this WebApplication app)
    {
        var db = app.Services.GetRequiredService<IMongoDatabase>();
        var collection = db.GetCollection<Template>(MongoCollection.Template);
        var models = new List<WriteModel<Template>>();
        var docs = new List<Template>()
        {
            Template.Create(
                id: Guid.Parse("c63f5f8d-daba-409f-88f9-fc3a9eb3e7e1"),
                key: TemplateKey.UserRegistered,
                channel: Domain.Enums.ChannelType.Email,
                subject: "Welcome to ProG Coder",
                isHtml: true,
                body: "<p>Hello <strong>{{DisplayName}}</strong>,</p> <p>thank you for signing up. We’re glad to have you!</p> <p>Best regards,</p> <p>ProG Coder</p>",
                createdBy: SystemConst.CreatedBySystem),
            Template.Create(
                id: Guid.Parse("c63f5f8d-daba-409f-88f9-fc3a9eb3e7e2"),
                key: TemplateKey.UserRegistered,
                channel: Domain.Enums.ChannelType.WhatsApp,
                subject: "Welcome to ProG Coder",
                isHtml: false,
                body: "Hello {{DisplayName}}, thank you for signing up. We’re glad to have you!",
                createdBy: SystemConst.CreatedBySystem),
            Template.Create(
                id: Guid.Parse("c63f5f8d-daba-409f-88f9-fc3a9eb3e7e3"),
                key: TemplateKey.UserRegistered,
                channel: Domain.Enums.ChannelType.InApp,
                subject: "Welcome to ProG Coder",
                isHtml: false,
                body: "Hello {{DisplayName}}, thank you for signing up",
                createdBy: SystemConst.CreatedBySystem)
        };

        foreach (var template in docs)
        {
            var filter = Builders<Template>.Filter.Eq(x => x.Id, template.Id);
            var replace = new ReplaceOneModel<Template>(filter, template)
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
        var notif = db.GetCollection<Domain.Entities.Notification>(MongoCollection.Notification);
        var deliv = db.GetCollection<Delivery>(MongoCollection.Delivery);
        var tmpl = db.GetCollection<Template>(MongoCollection.Template);

        await notif.Indexes.CreateOneAsync(new CreateIndexModel<Domain.Entities.Notification>(
        Builders<Domain.Entities.Notification>.IndexKeys
            .Ascending(x => x.UserId)
            .Ascending(x => x.IsRead)
            .Descending(x => x.CreatedOnUtc)));

        await deliv.Indexes.CreateOneAsync(new CreateIndexModel<Delivery>(
            Builders<Delivery>.IndexKeys
                .Ascending(x => x.Status)
                .Ascending(x => x.NextAttemptUtc)
                .Descending(x => x.Priority)
                .Ascending(x => x.CreatedOnUtc)));

        await tmpl.Indexes.CreateOneAsync(new CreateIndexModel<Template>(
            Builders<Template>.IndexKeys
                .Ascending(x => x.Key)
                .Ascending(x => x.Channel),
            new CreateIndexOptions { Unique = true }));
    }

    #endregion
}
