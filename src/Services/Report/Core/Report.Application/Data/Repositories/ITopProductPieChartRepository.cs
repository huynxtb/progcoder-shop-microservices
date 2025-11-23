#region using

using Report.Domain.Entities;

#endregion

namespace Report.Application.Data.Repositories;

public interface ITopProductPieChartRepository
{
    #region Methods

    Task<List<TopProductPieChartEntity>> GetTopProductsAsync(int limit = 5, CancellationToken cancellationToken = default);

    Task BulkUpsertAsync(List<TopProductPieChartEntity> entities, CancellationToken cancellationToken = default);

    #endregion
}

