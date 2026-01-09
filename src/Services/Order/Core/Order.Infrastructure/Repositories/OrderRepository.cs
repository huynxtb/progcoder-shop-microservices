#region using

using BuildingBlocks.Pagination;
using BuildingBlocks.Pagination.Extensions;
using Common.Models;
using Microsoft.EntityFrameworkCore;
using Order.Domain.Entities;
using Order.Domain.Repositories;
using Order.Domain.ValueObjects;
using Order.Infrastructure.Data;
using System.Linq.Expressions;

#endregion

namespace Order.Infrastructure.Repositories;

public class OrderRepository(ApplicationDbContext context) : Repository<OrderEntity>(context), IOrderRepository
{
    #region Implementations

    public async Task<OrderEntity?> GetByIdWithRelationshipAsync(Guid id, CancellationToken cancellationToken = default)
    {
        return await _dbSet
            .AsNoTracking()
            .Include(x => x.OrderItems)
            .Include(x => x.Customer)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<List<OrderEntity>> GetByCustomerWithRelationshipAsync(Guid customerId, CancellationToken cancellationToken = default)
    {
        return await _dbSet
            .AsNoTracking()
            .Include(x => x.OrderItems)
            .Where(x => x.Customer.Id == customerId)
            .OrderByDescending(x => x.CreatedOnUtc)
            .ToListAsync(cancellationToken);
    }

    public async Task<OrderEntity?> GetByOrderNoAsync(string orderNo, CancellationToken cancellationToken = default)
    {
        return await _dbSet
            .AsNoTracking()
            .Include(x => x.OrderItems)
            .FirstOrDefaultAsync(x => x.OrderNo.Value == orderNo, cancellationToken);
    }

    public async Task<List<OrderEntity>> SearchWithRelationshipAsync(
        Expression<Func<OrderEntity, bool>> predicate, 
        PaginationRequest pagination, 
        CancellationToken cancellationToken = default)
    {
        return await _dbSet
            .AsNoTracking()
            .Include(x => x.OrderItems)
            .Where(predicate)
            .OrderByDescending(x => x.CreatedOnUtc)
            .WithPaging(pagination)
            .ToListAsync(cancellationToken);
    }

    public async Task<List<OrderEntity>> SearchWithRelationshipAsync(Expression<Func<OrderEntity, bool>> predicate,
        CancellationToken cancellationToken = default)
    {
        return await _dbSet
            .AsNoTracking()
            .Include(x => x.OrderItems)
            .Where(predicate)
            .OrderByDescending(x => x.CreatedOnUtc)
            .ToListAsync(cancellationToken);
    }

    #endregion
}
