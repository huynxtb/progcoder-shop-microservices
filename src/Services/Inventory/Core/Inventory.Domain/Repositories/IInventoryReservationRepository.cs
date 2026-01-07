#region using

using Inventory.Domain.Entities;

#endregion

namespace Inventory.Domain.Repositories;

public interface IInventoryReservationRepository : IRepository<InventoryReservationEntity>
{
    #region Methods

    Task<InventoryReservationEntity?> GetByOrderAndProductAsync(
        Guid orderId, 
        Guid productId, 
        CancellationToken cancellationToken = default);

    Task<List<InventoryReservationEntity>> GetAllWithRelationshipAsync(CancellationToken cancellationToken = default);

    #endregion
}
