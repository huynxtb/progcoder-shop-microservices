#region using

using AutoMapper;
using Inventory.Domain.Abstractions;using Inventory.Domain.Repositories;
using Inventory.Application.Dtos.InventoryItems;
using Inventory.Application.Models.Results;
using Microsoft.EntityFrameworkCore;

#endregion

namespace Inventory.Application.Features.Location.Queries;

public sealed record GetLocationByIdQuery(Guid LocationId) : IQuery<GetLocationByIdResult>;

public sealed class GetLocationByIdQueryHandler(IUnitOfWork unitOfWork, IMapper mapper)
    : IQueryHandler<GetLocationByIdQuery, GetLocationByIdResult>
{
    #region Implementations

    public async Task<GetLocationByIdResult> Handle(GetLocationByIdQuery query, CancellationToken cancellationToken)
    {
        var entity = await unitOfWork.Locations
            .SingleOrDefaultAsync(x => x.Id == query.LocationId, cancellationToken)
            ?? throw new NotFoundException(MessageCode.ResourceNotFound);

        var location = mapper.Map<LocationDto>(entity);
        var result = new GetLocationByIdResult(location);

        return result;
    }

    #endregion
}

