#region using

using AutoMapper;
using Inventory.Application.Data;
using Inventory.Application.Dtos.InventoryItems;
using Inventory.Application.Models.Results;
using Microsoft.EntityFrameworkCore;

#endregion

namespace Inventory.Application.Features.Location.Queries;

public sealed record GetLocationByIdQuery(Guid LocationId) : IQuery<GetLocationByIdResult>;

public sealed class GetLocationByIdQueryHandler(IApplicationDbContext dbContext, IMapper mapper)
    : IQueryHandler<GetLocationByIdQuery, GetLocationByIdResult>
{
    #region Implementations

    public async Task<GetLocationByIdResult> Handle(GetLocationByIdQuery query, CancellationToken cancellationToken)
    {
        var entity = await dbContext.Locations
            .AsNoTracking()
            .SingleOrDefaultAsync(x => x.Id == query.LocationId, cancellationToken)
            ?? throw new NotFoundException(MessageCode.ResourceNotFound);

        var location = mapper.Map<LocationDto>(entity);
        var result = new GetLocationByIdResult(location);

        return result;
    }

    #endregion
}

