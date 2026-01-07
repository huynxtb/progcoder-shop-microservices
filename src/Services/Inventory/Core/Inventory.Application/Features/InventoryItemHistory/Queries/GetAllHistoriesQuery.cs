#region using

using AutoMapper;
using Inventory.Domain.Abstractions;using Inventory.Domain.Repositories;
using Inventory.Application.Dtos.InventoryItems;
using Inventory.Application.Models.Results;
using Microsoft.EntityFrameworkCore;

#endregion

namespace Inventory.Application.Features.InventoryItemHistory.Queries;

public sealed record GetAllHistoriesQuery : IQuery<GetAllHistoriesResult>;

public sealed class GetAllHistoriesQueryHandler(
    IUnitOfWork unitOfWork,
    IMapper mapper) : IQueryHandler<GetAllHistoriesQuery, GetAllHistoriesResult>
{
    #region Implementations

    public async Task<GetAllHistoriesResult> Handle(GetAllHistoriesQuery query, CancellationToken cancellationToken)
    {
        var result = await unitOfWork.InventoryHistories.GetAllAsync(cancellationToken);
        var items = mapper.Map<List<InventoryHistoryDto>>(result);
        var response = new GetAllHistoriesResult(items);

        return response;
    }

    #endregion
}
