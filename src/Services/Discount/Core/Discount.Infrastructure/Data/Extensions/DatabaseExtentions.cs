#region using

using Discount.Domain.Entities;
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
        
        // Unique index on Code.Value for fast lookups and uniqueness constraint
        await coupon.Indexes.CreateOneAsync(new CreateIndexModel<CouponEntity>(
            Builders<CouponEntity>.IndexKeys
                .Ascending(x => x.Code),
            new CreateIndexOptions { Unique = true, Name = "IX_Coupon_Code_Unique" }));

        // Index on Status for filtering by coupon status
        await coupon.Indexes.CreateOneAsync(new CreateIndexModel<CouponEntity>(
            Builders<CouponEntity>.IndexKeys
                .Ascending(x => x.Status),
            new CreateIndexOptions { Name = "IX_Coupon_Status" }));

        // Index on Type for filtering by coupon type (Fixed/Percentage)
        await coupon.Indexes.CreateOneAsync(new CreateIndexModel<CouponEntity>(
            Builders<CouponEntity>.IndexKeys
                .Ascending(x => x.Type),
            new CreateIndexOptions { Name = "IX_Coupon_Type" }));

        // Index on ValidFrom for finding coupons that are valid from a specific date
        await coupon.Indexes.CreateOneAsync(new CreateIndexModel<CouponEntity>(
            Builders<CouponEntity>.IndexKeys
                .Ascending(x => x.ValidFrom),
            new CreateIndexOptions { Name = "IX_Coupon_ValidFrom" }));

        // Index on ValidTo for finding expired coupons
        await coupon.Indexes.CreateOneAsync(new CreateIndexModel<CouponEntity>(
            Builders<CouponEntity>.IndexKeys
                .Ascending(x => x.ValidTo),
            new CreateIndexOptions { Name = "IX_Coupon_ValidTo" }));

        // Compound index for finding valid/active coupons efficiently
        // Common query: Status = Approved AND ValidFrom <= now AND ValidTo >= now
        await coupon.Indexes.CreateOneAsync(new CreateIndexModel<CouponEntity>(
            Builders<CouponEntity>.IndexKeys
                .Ascending(x => x.Status)
                .Ascending(x => x.ValidFrom)
                .Ascending(x => x.ValidTo),
            new CreateIndexOptions { Name = "IX_Coupon_Status_ValidFrom_ValidTo" }));

        // Compound index for finding coupons by status and type
        await coupon.Indexes.CreateOneAsync(new CreateIndexModel<CouponEntity>(
            Builders<CouponEntity>.IndexKeys
                .Ascending(x => x.Status)
                .Ascending(x => x.Type),
            new CreateIndexOptions { Name = "IX_Coupon_Status_Type" }));

        // Index on UsesCount for finding coupons that are not out of uses
        await coupon.Indexes.CreateOneAsync(new CreateIndexModel<CouponEntity>(
            Builders<CouponEntity>.IndexKeys
                .Ascending(x => x.UsesCount),
            new CreateIndexOptions { Name = "IX_Coupon_UsesCount" }));
    }

    #endregion
}
