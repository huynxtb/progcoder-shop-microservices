#region using

using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using MongoDB.Driver;
using Notification.Application.Constants;
using Notification.Domain.Entities;
using SourceCommon.Constants;

#endregion

namespace Notification.Infrastructure.Data.Extensions;

public static class DatabaseExtentions
{
    #region Methods

    public static async Task InitialiseDatabaseAsync(this WebApplication app)
    {
        var collection = app.Services.GetRequiredService<IMongoCollection<NotificationTemplate>>();
        var models = new List<WriteModel<NotificationTemplate>>();
        var docs = new List<NotificationTemplate>()
        {
            NotificationTemplate.Create(
                id: Guid.Parse("c63f5f8d-daba-409f-88f9-fc3a9eb3e7e1"),
                key: TemplateKey.UserRegistered,
                channel: Domain.Enums.ChannelType.Email,
                subject: "Welcome to ProG Coder",
                body: "<p>Hello <strong>{{DisplayName}}</strong>,</p> <p>thank you for signing up. We’re glad to have you!</p> <p>Best regards,</p> <p>ProG Coder</p>",
                createdBy: SystemConst.CreatedBySystem),
            NotificationTemplate.Create(
                id: Guid.Parse("c63f5f8d-daba-409f-88f9-fc3a9eb3e7e2"),
                key: TemplateKey.UserRegistered,
                channel: Domain.Enums.ChannelType.WhatsApp,
                subject: "Welcome to ProG Coder",
                body: "Hello {{DisplayName}}, thank you for signing up. We’re glad to have you!",
                createdBy: SystemConst.CreatedBySystem),
            NotificationTemplate.Create(
                id: Guid.Parse("c63f5f8d-daba-409f-88f9-fc3a9eb3e7e3"),
                key: TemplateKey.UserRegistered,
                channel: Domain.Enums.ChannelType.InApp,
                subject: "Welcome to ProG Coder",
                body: "Hello {{DisplayName}}, thank you for signing up",
                createdBy: SystemConst.CreatedBySystem)
        };

        foreach (var template in docs)
        {
            var filter = Builders<NotificationTemplate>.Filter.Eq(x => x.Id, template.Id);
            var replace = new ReplaceOneModel<NotificationTemplate>(filter, template)
            {
                IsUpsert = true
            };

            models.Add(replace);
        }

        await collection.BulkWriteAsync(models);
    }

    public static async Task EnsureIndexesAsync(this WebApplication app)
    {
        var notif = app.Services.GetRequiredService<IMongoCollection<AppNotification>>();
        var deliv = app.Services.GetRequiredService<IMongoCollection<NotificationDelivery>>();
        var tmpl = app.Services.GetRequiredService<IMongoCollection<NotificationTemplate>>();

        await notif.Indexes.CreateOneAsync(new CreateIndexModel<AppNotification>(
        Builders<AppNotification>.IndexKeys
            .Ascending(x => x.UserId)
            .Ascending(x => x.IsRead)
            .Descending(x => x.CreatedOnUtc)));

        await deliv.Indexes.CreateOneAsync(new CreateIndexModel<NotificationDelivery>(
            Builders<NotificationDelivery>.IndexKeys
                .Ascending(x => x.Status)
                .Ascending(x => x.NextAttemptUtc)
                .Descending(x => x.Priority)
                .Ascending(x => x.CreatedOnUtc)));

        await tmpl.Indexes.CreateOneAsync(new CreateIndexModel<NotificationTemplate>(
            Builders<NotificationTemplate>.IndexKeys
                .Ascending(x => x.Key)
                .Ascending(x => x.Channel),
            new CreateIndexOptions { Unique = true }));
    }

    #endregion
}
