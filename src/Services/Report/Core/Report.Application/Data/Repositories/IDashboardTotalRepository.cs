#region using

using Report.Domain.Entities;

#endregion

namespace Report.Application.Data.Repositories;

public interface IDashboardTotalRepository
{
    #region Methods

    Task<List<DashboardTotalEntity>> GetAllAsync(CancellationToken cancellationToken = default);

    Task BulkUpsertAsync(List<DashboardTotalEntity> entities, CancellationToken cancellationToken = default);

    #endregion
}

