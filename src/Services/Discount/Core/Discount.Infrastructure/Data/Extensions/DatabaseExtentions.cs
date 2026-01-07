#region using

using Common.ValueObjects;
using Common.Constants;
using Discount.Domain.Entities;
using Discount.Domain.Enums;
using Discount.Infrastructure.Constants;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using MongoDB.Driver;

#endregion

namespace Discount.Infrastructure.Data.Extensions;

public static class DatabaseExtentions
{
    #region Methods

    public static async Task EnsureIndexesAsync(this WebApplication app)
    {
        var db = app.Services.GetRequiredService<IMongoDatabase>();
        var coupon = db.GetCollection<CouponEntity>(MongoCollection.Coupon);

        await coupon.Indexes.CreateOneAsync(new CreateIndexModel<CouponEntity>(
            Builders<CouponEntity>.IndexKeys
                .Ascending(x => x.Code),
            new CreateIndexOptions { Unique = true, Name = "IX_Coupon_Code_Unique" }));

        await coupon.Indexes.CreateOneAsync(new CreateIndexModel<CouponEntity>(
            Builders<CouponEntity>.IndexKeys
                .Ascending(x => x.Status),
            new CreateIndexOptions { Name = "IX_Coupon_Status" }));

        await coupon.Indexes.CreateOneAsync(new CreateIndexModel<CouponEntity>(
            Builders<CouponEntity>.IndexKeys
                .Ascending(x => x.Type),
            new CreateIndexOptions { Name = "IX_Coupon_Type" }));

        await coupon.Indexes.CreateOneAsync(new CreateIndexModel<CouponEntity>(
            Builders<CouponEntity>.IndexKeys
                .Ascending(x => x.ValidFrom),
            new CreateIndexOptions { Name = "IX_Coupon_ValidFrom" }));

        await coupon.Indexes.CreateOneAsync(new CreateIndexModel<CouponEntity>(
            Builders<CouponEntity>.IndexKeys
                .Ascending(x => x.ValidTo),
            new CreateIndexOptions { Name = "IX_Coupon_ValidTo" }));

        await coupon.Indexes.CreateOneAsync(new CreateIndexModel<CouponEntity>(
            Builders<CouponEntity>.IndexKeys
                .Ascending(x => x.Status)
                .Ascending(x => x.ValidFrom)
                .Ascending(x => x.ValidTo),
            new CreateIndexOptions { Name = "IX_Coupon_Status_ValidFrom_ValidTo" }));

        await coupon.Indexes.CreateOneAsync(new CreateIndexModel<CouponEntity>(
            Builders<CouponEntity>.IndexKeys
                .Ascending(x => x.Status)
                .Ascending(x => x.Type),
            new CreateIndexOptions { Name = "IX_Coupon_Status_Type" }));

        await coupon.Indexes.CreateOneAsync(new CreateIndexModel<CouponEntity>(
            Builders<CouponEntity>.IndexKeys
                .Ascending(x => x.UsageCount),
            new CreateIndexOptions { Name = "IX_Coupon_UsageCount" }));
    }

    public static async Task SeedDataAsync(this WebApplication app)
    {
        var db = app.Services.GetRequiredService<IMongoDatabase>();
        var couponCollection = db.GetCollection<CouponEntity>(MongoCollection.Coupon);
        var now = DateTime.UtcNow;
        var count = await couponCollection.CountDocumentsAsync(x => x.Status == CouponStatus.Approved
                && x.ValidFrom <= now
                && x.ValidTo >= now
                && x.UsageCount < x.MaxUsage);

        if (count == 0)
        {
            var fixedId = Guid.NewGuid();
            var randomFixedCoupon = CouponEntity.Create(id: fixedId,
                code: $"RND-{fixedId.ToString().Split("-").First().ToUpper()}",
                name: $"Random Fixed Coupon {fixedId.ToString().Split("-").First().ToUpper()}",
                description: "Random Fixed Coupon",
                type: Domain.Enums.CouponType.Fixed,
                value: 55000,
                maxUsage: 5,
                minPurchaseAmount: 100000,
                maxDiscountAmount: null,
                validFrom: now,
                validTo: now.AddDays(3),
                performBy: Actor.System(AppConstants.Service.Discount).ToString());
            randomFixedCoupon.Approve(Actor.System(AppConstants.Service.Discount).ToString());

            var percentageId = Guid.NewGuid();
            var randomPercentageCoupon = CouponEntity.Create(id: percentageId,
                code: $"RND-{percentageId.ToString().Split("-").First().ToUpper()}",
                name: $"Random Percentage Coupon {percentageId.ToString().Split("-").First().ToUpper()}",
                description: "Random Percentage Coupon",
                type: Domain.Enums.CouponType.Percentage,
                value: 30,
                maxUsage: 5,
                minPurchaseAmount: 100000,
                maxDiscountAmount: 25000,
                validFrom: now,
                validTo: now.AddDays(3),
                performBy: Actor.System(AppConstants.Service.Discount).ToString());
            randomPercentageCoupon.Approve(Actor.System(AppConstants.Service.Discount).ToString());

            await couponCollection.InsertManyAsync(new[] { randomFixedCoupon, randomPercentageCoupon });
        }
    }
    #endregion
}
