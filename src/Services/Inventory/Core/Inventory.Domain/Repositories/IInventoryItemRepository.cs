#region using

using Inventory.Domain.Entities;
using System.Linq.Expressions;

#endregion

namespace Inventory.Domain.Repositories;

public interface IInventoryItemRepository : IRepository<InventoryItemEntity>
{
    #region Methods

    Task<List<InventoryItemEntity>> GetAllWithRelationshipAsync(CancellationToken cancellationToken = default);

    Task<List<InventoryItemEntity>> FindByProductWithRelationshipAsync(Guid productId, CancellationToken cancellationToken = default);

    Task<List<InventoryItemEntity>> SearchWithRelationshipAsync(Expression<Func<InventoryItemEntity, bool>> predicate,
        PaginationRequest pagination,
        CancellationToken cancellationToken = default);

    #endregion
}
