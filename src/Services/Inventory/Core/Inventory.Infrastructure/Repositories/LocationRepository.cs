#region using

using Inventory.Domain.Entities;
using Inventory.Domain.Repositories;
using Inventory.Infrastructure.Data;

#endregion

namespace Inventory.Infrastructure.Repositories;

public class LocationRepository : Repository<LocationEntity>, ILocationRepository
{
    #region Ctors

    public LocationRepository(ApplicationDbContext context) : base(context)
    {
    }

    #endregion
}
