#region using

using AutoMapper;
using Inventory.Application.Data;
using Inventory.Application.Dtos.InventoryReservations;
using Inventory.Application.Models.Results;
using Microsoft.EntityFrameworkCore;

#endregion

namespace Inventory.Application.CQRS.InventoryReservation.Queries;

public sealed record GetAllInventoryReservationQuery : IQuery<GetAllInventoryReservationResult>;

public sealed class GetAllInventoryReservationQueryHandler(IApplicationDbContext dbContext, IMapper mapper)
    : IQueryHandler<GetAllInventoryReservationQuery, GetAllInventoryReservationResult>
{
    #region Implementations

    public async Task<GetAllInventoryReservationResult> Handle(GetAllInventoryReservationQuery query, CancellationToken cancellationToken)
    {
        var result = await dbContext.InventoryReservations
            .AsNoTracking()
            .Include(x => x.Location)
            .OrderByDescending(x => x.CreatedOnUtc)
            .ToListAsync(cancellationToken);

        var items = mapper.Map<List<ReservationDto>>(result);
        var response = new GetAllInventoryReservationResult(items);

        return response;
    }

    #endregion
}
