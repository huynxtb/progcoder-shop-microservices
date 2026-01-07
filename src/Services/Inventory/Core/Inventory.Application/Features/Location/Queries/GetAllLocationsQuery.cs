#region using

using AutoMapper;
using Inventory.Application.Dtos.InventoryItems;
using Inventory.Application.Models.Results;
using Inventory.Domain.Abstractions;

#endregion

namespace Inventory.Application.Features.Location.Queries;

public sealed record GetAllLocationsQuery : IQuery<GetAllLocationsResult>;

public sealed class GetAllLocationsQueryHandler(IUnitOfWork unitOfWork, IMapper mapper)
    : IQueryHandler<GetAllLocationsQuery, GetAllLocationsResult>
{
    #region Implementations

    public async Task<GetAllLocationsResult> Handle(GetAllLocationsQuery query, CancellationToken cancellationToken)
    {
        var result = await unitOfWork.Locations.GetAllAsync(cancellationToken);
        var items = mapper.Map<List<LocationDto>>(result);
        var response = new GetAllLocationsResult(items);

        return response;
    }

    #endregion
}

