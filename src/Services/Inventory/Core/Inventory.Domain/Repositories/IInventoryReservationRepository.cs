#region using

using BuildingBlocks.Abstractions;
using Inventory.Domain.Entities;

#endregion

namespace Inventory.Domain.Repositories;

public interface IInventoryReservationRepository : IBaseRepository<InventoryReservationEntity>
{
    #region Methods

    Task<InventoryReservationEntity?> GetByOrderAndProductAsync(
        Guid orderId,
        Guid productId,
        CancellationToken cancellationToken = default);

    Task<List<InventoryReservationEntity>> GetAllWithRelationshipAsync(CancellationToken cancellationToken = default);

    #endregion
}
