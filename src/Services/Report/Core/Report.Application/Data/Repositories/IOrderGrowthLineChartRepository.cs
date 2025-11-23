#region using

using Report.Domain.Entities;

#endregion

namespace Report.Application.Data.Repositories;

public interface IOrderGrowthLineChartRepository
{
    #region Methods

    Task<List<OrderGrowthLineChartEntity>> GetByMonthAsync(int year, int month, CancellationToken cancellationToken = default);

    Task<List<OrderGrowthLineChartEntity>> GetByDateRangeAsync(DateTime startDate, DateTime endDate, CancellationToken cancellationToken = default);

    Task BulkUpsertAsync(List<OrderGrowthLineChartEntity> entities, CancellationToken cancellationToken = default);

    #endregion
}

