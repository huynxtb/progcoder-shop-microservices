#region using

using BuildingBlocks.Pagination;
using BuildingBlocks.Pagination.Extensions;
using Inventory.Domain.Entities;
using Inventory.Domain.Repositories;
using Inventory.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

#endregion

namespace Inventory.Infrastructure.Repositories;

public class InventoryItemRepository(ApplicationDbContext context) : Repository<InventoryItemEntity>(context), IInventoryItemRepository
{
    #region Implementations
    
    public async Task<List<InventoryItemEntity>> FindByProductWithRelationshipAsync(Guid productId, CancellationToken cancellationToken = default)
    {
        return await _dbSet
            .AsNoTracking()
            .Include(x => x.Location)
            .Where(x => x.Product.Id == productId && x.Quantity > x.Reserved)
            .OrderByDescending(x => x.Quantity - x.Reserved)
            .ToListAsync(cancellationToken);
    }

    public async Task<List<InventoryItemEntity>> GetAllWithRelationshipAsync(CancellationToken cancellationToken = default)
    {
        return await _dbSet
            .AsNoTracking()
            .Include(x => x.Location)
            .OrderByDescending(x => x.CreatedOnUtc)
            .ToListAsync(cancellationToken);
    }

    public async Task<List<InventoryItemEntity>> SearchWithRelationshipAsync(Expression<Func<InventoryItemEntity, bool>> predicate, 
        PaginationRequest pagination, 
        CancellationToken cancellationToken = default)
    {
        return await _dbSet
            .AsNoTracking()
            .Include(x => x.Location)
            .Where(predicate)
            .OrderByDescending(x => x.CreatedOnUtc)
            .WithPaging(pagination)
            .ToListAsync(cancellationToken);
    }

    #endregion
}
