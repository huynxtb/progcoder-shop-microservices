#region using

using Discount.Application.Repositories;
using Discount.Domain.Entities;
using Discount.Domain.Enums;
using Discount.Domain.ValueObjects;
using Discount.Infrastructure.Constants;
using MongoDB.Driver;

#endregion

namespace Discount.Infrastructure.Repositories;

public sealed class CouponRepository : ICouponRepository
{
    #region Fields, Properties and Indexers

    private readonly IMongoCollection<CouponEntity> _collection;

    #endregion

    #region Ctors

    public CouponRepository(IMongoDatabase db)
    {
        _collection = db.GetCollection<CouponEntity>(MongoCollection.Coupon);
    }

    #endregion

    #region Implementations

    public async Task<CouponEntity?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        return await _collection
            .Find(x => x.Id == id)
            .FirstOrDefaultAsync(cancellationToken);
    }

    public async Task<CouponEntity?> GetByCodeAsync(CouponCode code, CancellationToken cancellationToken = default)
    {
        return await GetByCodeAsync(code.Value, cancellationToken);
    }

    public async Task<CouponEntity?> GetByCodeAsync(string code, CancellationToken cancellationToken = default)
    {
        var now = DateTime.UtcNow;
        return await _collection
            .Find(x => x.Code == code)
            .FirstOrDefaultAsync(cancellationToken);
    }

    public async Task<bool> ExistsByCodeAsync(CouponCode code, CancellationToken cancellationToken = default)
    {
        return await ExistsByCodeAsync(code.Value, cancellationToken);
    }

    public async Task<bool> ExistsByCodeAsync(string code, CancellationToken cancellationToken = default)
    {
        var count = await _collection
            .CountDocumentsAsync(x => x.Code == code, cancellationToken: cancellationToken);
        return count > 0;
    }

    public async Task<IEnumerable<CouponEntity>> GetByStatusAsync(CouponStatus status, CancellationToken cancellationToken = default)
    {
        return await _collection
            .Find(x => x.Status == status)
            .ToListAsync(cancellationToken);
    }

    public async Task<IEnumerable<CouponEntity>> GetByTypeAsync(CouponType type, CancellationToken cancellationToken = default)
    {
        return await _collection
            .Find(x => x.Type == type)
            .ToListAsync(cancellationToken);
    }

    public async Task<IEnumerable<CouponEntity>> GetValidCouponsAsync(CancellationToken cancellationToken = default)
    {
        var now = DateTime.UtcNow;
        return await _collection
            .Find(x => x.Status == CouponStatus.Approved
                && x.ValidFrom <= now
                && x.ValidTo >= now
                && x.UsageCount < x.MaxUsage)
            .ToListAsync(cancellationToken);
    }

    public async Task<IEnumerable<CouponEntity>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        return await _collection
            .Find(_ => true)
            .ToListAsync(cancellationToken);
    }

    public async Task<CouponEntity> CreateAsync(CouponEntity coupon, CancellationToken cancellationToken = default)
    {
        await _collection.InsertOneAsync(coupon, cancellationToken: cancellationToken);
        return coupon;
    }

    public async Task<bool> UpdateAsync(CouponEntity coupon, CancellationToken cancellationToken = default)
    {
        var result = await _collection.ReplaceOneAsync(
            x => x.Id == coupon.Id,
            coupon,
            cancellationToken: cancellationToken);
        return result.IsAcknowledged && result.ModifiedCount > 0;
    }

    public async Task<bool> DeleteAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var result = await _collection.DeleteOneAsync(x => x.Id == id, cancellationToken);
        return result.IsAcknowledged && result.DeletedCount > 0;
    }

    #endregion
}
