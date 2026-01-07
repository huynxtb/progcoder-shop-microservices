#region using

using Inventory.Domain.Entities;
using Inventory.Domain.Repositories;
using Inventory.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

#endregion

namespace Inventory.Infrastructure.Repositories;

public class InventoryReservationRepository(ApplicationDbContext context) : Repository<InventoryReservationEntity>(context), IInventoryReservationRepository
{
    #region Implementations

    public async Task<InventoryReservationEntity?> GetByOrderAndProductAsync(
        Guid orderId,
        Guid productId,
        CancellationToken cancellationToken = default)
    {
        return await _dbSet
            .FirstOrDefaultAsync(r =>
                    r.ReferenceId == orderId && r.Product.Id == productId,
                cancellationToken);
    }

    public async Task<List<InventoryReservationEntity>> GetAllWithRelationshipAsync(CancellationToken cancellationToken = default)
    {
        return await _dbSet
            .AsNoTracking()
            .Include(x => x.Location)
            .OrderByDescending(x => x.CreatedOnUtc)
            .ToListAsync(cancellationToken);
    }

    #endregion
}
