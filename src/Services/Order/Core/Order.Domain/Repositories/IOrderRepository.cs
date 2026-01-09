#region using

using Order.Domain.Entities;
using System.Linq.Expressions;

#endregion

namespace Order.Domain.Repositories;

public interface IOrderRepository : IRepository<OrderEntity>
{
    #region Methods

    Task<OrderEntity?> GetByIdWithRelationshipAsync(Guid id, CancellationToken cancellationToken = default);

    Task<List<OrderEntity>> GetByCustomerWithRelationshipAsync(Guid customerId, CancellationToken cancellationToken = default);

    Task<OrderEntity?> GetByOrderNoAsync(string orderNo, CancellationToken cancellationToken = default);

    Task<List<OrderEntity>> SearchWithRelationshipAsync(
        Expression<Func<OrderEntity, bool>> predicate,
        PaginationRequest pagination,
        CancellationToken cancellationToken = default);

    Task<List<OrderEntity>> SearchWithRelationshipAsync(Expression<Func<OrderEntity, bool>> predicate, CancellationToken cancellationToken = default);

    #endregion
}
