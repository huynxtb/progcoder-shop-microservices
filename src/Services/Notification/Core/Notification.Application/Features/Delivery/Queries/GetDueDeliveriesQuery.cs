#region using

using Notification.Application.Data.Repositories;
using Notification.Domain.Entities;

#endregion

namespace Notification.Application.Features.Delivery.Queries;

public sealed record GetDueDeliveriesQuery(DateTimeOffset Now, int BatchSize) : IQuery<IReadOnlyList<DeliveryEntity>>;

public sealed class GetDueDeliveriesQueryHandler(
    IQueryDeliveryRepository deliveryQueryRepo)
    : IQueryHandler<GetDueDeliveriesQuery, IReadOnlyList<DeliveryEntity>>
{
    #region Implementations

    public async Task<IReadOnlyList<DeliveryEntity>> Handle(GetDueDeliveriesQuery query, CancellationToken cancellationToken)
    {
        return await deliveryQueryRepo.GetDueAsync(query.Now, query.BatchSize, cancellationToken);
    }

    #endregion
}

