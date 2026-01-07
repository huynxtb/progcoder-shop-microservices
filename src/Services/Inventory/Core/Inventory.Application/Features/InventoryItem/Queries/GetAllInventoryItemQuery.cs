#region using

using AutoMapper;
using Inventory.Domain.Abstractions;using Inventory.Domain.Repositories;
using Inventory.Application.Dtos.InventoryItems;
using Inventory.Application.Models.Results;
using Microsoft.EntityFrameworkCore;

#endregion

namespace Inventory.Application.Features.InventoryItem.Queries;

public sealed record GetAllInventoryItemQuery : IQuery<GetAllInventoryItemResult>;

public sealed class GetAllInventoryItemQueryHandler(IUnitOfWork unitOfWork, IMapper mapper)
    : IQueryHandler<GetAllInventoryItemQuery, GetAllInventoryItemResult>
{
    #region Implementations

    public async Task<GetAllInventoryItemResult> Handle(GetAllInventoryItemQuery query, CancellationToken cancellationToken)
    {
        var result = await unitOfWork.InventoryItems.GetAllWithRelationshipAsync(cancellationToken);
        var items = mapper.Map<List<InventoryItemDto>>(result);
        var reponse = new GetAllInventoryItemResult(items);

        return reponse;
    }

    #endregion
}