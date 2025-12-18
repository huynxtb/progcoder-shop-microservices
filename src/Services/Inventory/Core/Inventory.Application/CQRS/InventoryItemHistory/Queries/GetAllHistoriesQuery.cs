#region using

using AutoMapper;
using Inventory.Application.Data;
using Inventory.Application.Dtos.InventoryItems;
using Inventory.Application.Models.Results;
using Microsoft.EntityFrameworkCore;

#endregion

namespace Inventory.Application.CQRS.InventoryItemHistory.Queries;

public sealed record GetAllHistoriesQuery : IQuery<GetAllHistoriesResult>;

public sealed class GetAllHistoriesQueryHandler(
    IApplicationDbContext dbContext,
    IMapper mapper) : IQueryHandler<GetAllHistoriesQuery, GetAllHistoriesResult>
{
    #region Implementations

    public async Task<GetAllHistoriesResult> Handle(GetAllHistoriesQuery query, CancellationToken cancellationToken)
    {
        var result = await dbContext.InventoryHistories
            .AsNoTracking()
            .OrderByDescending(x => x.CreatedOnUtc)
            .ToListAsync(cancellationToken);

        var items = mapper.Map<List<InventoryHistoryDto>>(result);
        var response = new GetAllHistoriesResult(items);

        return response;
    }

    #endregion
}
