#region using

using Discount.Domain.Entities;
using Discount.Domain.Enums;
using Discount.Domain.ValueObjects;

#endregion

namespace Discount.Application.Repositories;

public interface ICouponRepository
{
    #region Methods

    Task<CouponEntity?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);

    Task<CouponEntity?> GetByCodeAsync(CouponCode code, CancellationToken cancellationToken = default);

    Task<CouponEntity?> GetByCodeAsync(string code, CancellationToken cancellationToken = default);

    Task<bool> ExistsByCodeAsync(CouponCode code, CancellationToken cancellationToken = default);

    Task<bool> ExistsByCodeAsync(string code, CancellationToken cancellationToken = default);

    Task<IEnumerable<CouponEntity>> GetByStatusAsync(CouponStatus status, CancellationToken cancellationToken = default);

    Task<IEnumerable<CouponEntity>> GetByTypeAsync(CouponType type, CancellationToken cancellationToken = default);

    Task<IEnumerable<CouponEntity>> GetValidCouponsAsync(CancellationToken cancellationToken = default);

    Task<IEnumerable<CouponEntity>> GetAllAsync(CancellationToken cancellationToken = default);

    Task<CouponEntity> CreateAsync(CouponEntity coupon, CancellationToken cancellationToken = default);

    Task<bool> UpdateAsync(CouponEntity coupon, CancellationToken cancellationToken = default);

    Task<bool> DeleteAsync(Guid id, CancellationToken cancellationToken = default);

    #endregion
}

