#region using

using AutoMapper;
using Inventory.Application.Data;
using Inventory.Application.Dtos.InventoryItems;
using Inventory.Application.Models.Results;
using Microsoft.EntityFrameworkCore;

#endregion

namespace Inventory.Application.CQRS.InventoryItem.Queries;

public sealed record GetAllInventoryItemQuery : IQuery<GetAllInventoryItemResult>;

public sealed class GetAllInventoryItemQueryHandler(IApplicationDbContext dbContext, IMapper mapper)
    : IQueryHandler<GetAllInventoryItemQuery, GetAllInventoryItemResult>
{
    #region Implementations

    public async Task<GetAllInventoryItemResult> Handle(GetAllInventoryItemQuery query, CancellationToken cancellationToken)
    {
        var result = await dbContext.InventoryItems
            .AsNoTracking()
            .Include(x => x.Location)
            .OrderByDescending(x => x.CreatedOnUtc)
            .ToListAsync(cancellationToken);

        var items = mapper.Map<List<InventoryItemDto>>(result);
        var reponse = new GetAllInventoryItemResult(items);

        return reponse;
    }

    #endregion
}