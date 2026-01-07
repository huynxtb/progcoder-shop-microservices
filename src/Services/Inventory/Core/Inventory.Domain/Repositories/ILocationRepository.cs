#region using

using BuildingBlocks.Abstractions;
using Inventory.Domain.Entities;

#endregion

namespace Inventory.Domain.Repositories;

public interface ILocationRepository : IBaseRepository<LocationEntity>
{
}
