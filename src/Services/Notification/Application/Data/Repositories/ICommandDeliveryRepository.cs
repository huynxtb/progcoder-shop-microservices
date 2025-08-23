#region using

using Notification.Domain.Entities;

#endregion

namespace Notification.Application.Data.Repositories;

public interface ICommandDeliveryRepository
{
    #region Methods

    Task InsertManyAsync(IEnumerable<DeliveryEntity> docs, CancellationToken cancellationToken = default);

    Task UpsertAsync(DeliveryEntity doc, CancellationToken cancellationToken = default);

    #endregion
}
