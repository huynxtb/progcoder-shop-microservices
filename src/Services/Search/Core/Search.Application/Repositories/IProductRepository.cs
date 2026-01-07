#region using

using Search.Application.Models.Filters;
using Search.Domain.Entities;

#endregion

namespace Search.Application.Repositories;

public interface IProductRepository
{
    #region Methods

    Task<(List<ProductEntity> Items, long TotalCount)> SearchAsync(
        SearchTermsFilter filter,
        PaginationRequest? paging = null,
        CancellationToken cancellationToken = default);

    Task<bool> UpsertAsync(ProductEntity product, CancellationToken cancellationToken = default);

    Task<bool> DeleteAsync(string productId, CancellationToken cancellationToken = default);

    #endregion
}
