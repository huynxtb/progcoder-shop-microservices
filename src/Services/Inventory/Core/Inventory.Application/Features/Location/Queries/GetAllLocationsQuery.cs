#region using

using AutoMapper;
using Inventory.Application.Data;
using Inventory.Application.Dtos.InventoryItems;
using Inventory.Application.Models.Results;
using Microsoft.EntityFrameworkCore;

#endregion

namespace Inventory.Application.Features.Location.Queries;

public sealed record GetAllLocationsQuery : IQuery<GetAllLocationsResult>;

public sealed class GetAllLocationsQueryHandler(IApplicationDbContext dbContext, IMapper mapper)
    : IQueryHandler<GetAllLocationsQuery, GetAllLocationsResult>
{
    #region Implementations

    public async Task<GetAllLocationsResult> Handle(GetAllLocationsQuery query, CancellationToken cancellationToken)
    {
        var result = await dbContext.Locations
            .AsNoTracking()
            .OrderByDescending(x => x.CreatedOnUtc)
            .ToListAsync(cancellationToken);

        var items = mapper.Map<List<LocationDto>>(result);
        var response = new GetAllLocationsResult(items);

        return response;
    }

    #endregion
}

