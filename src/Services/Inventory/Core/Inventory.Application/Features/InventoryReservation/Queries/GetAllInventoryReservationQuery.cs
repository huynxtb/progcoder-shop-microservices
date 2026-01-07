#region using

using AutoMapper;
using Inventory.Domain.Abstractions;using Inventory.Domain.Repositories;
using Inventory.Application.Dtos.InventoryReservations;
using Inventory.Application.Models.Results;
using Microsoft.EntityFrameworkCore;

#endregion

namespace Inventory.Application.Features.InventoryReservation.Queries;

public sealed record GetAllInventoryReservationQuery : IQuery<GetAllInventoryReservationResult>;

public sealed class GetAllInventoryReservationQueryHandler(IUnitOfWork unitOfWork, IMapper mapper)
    : IQueryHandler<GetAllInventoryReservationQuery, GetAllInventoryReservationResult>
{
    #region Implementations

    public async Task<GetAllInventoryReservationResult> Handle(GetAllInventoryReservationQuery query, CancellationToken cancellationToken)
    {
        var result = await unitOfWork.InventoryReservations
            .GetAllWithRelationshipAsync(cancellationToken);
        var items = mapper.Map<List<ReservationDto>>(result);
        var response = new GetAllInventoryReservationResult(items);

        return response;
    }

    #endregion
}
