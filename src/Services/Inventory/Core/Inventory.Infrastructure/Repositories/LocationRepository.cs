#region using

using Inventory.Domain.Entities;
using Inventory.Domain.Repositories;
using Inventory.Infrastructure.Data;

#endregion

namespace Inventory.Infrastructure.Repositories;

public class LocationRepository(ApplicationDbContext context) : Repository<LocationEntity>(context), ILocationRepository
{
}
