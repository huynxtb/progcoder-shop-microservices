#region using

using AutoMapper;
using Inventory.Application.Data;
using Inventory.Application.Dtos.InventoryReservations;
using Inventory.Application.Models.Results;
using Microsoft.EntityFrameworkCore;

#endregion

namespace Inventory.Application.CQRS.InventoryReservation.Queries;

public sealed record GetReservationsByReferenceQuery(Guid ReferenceId) : IQuery<GetReservationsByReferenceResult>;

public sealed class GetReservationsByReferenceQueryValidator : AbstractValidator<GetReservationsByReferenceQuery>
{
    #region Ctors

    public GetReservationsByReferenceQueryValidator()
    {
        RuleFor(x => x.ReferenceId)
            .NotEmpty()
            .WithMessage(MessageCode.BadRequest);
    }

    #endregion
}

public sealed class GetReservationsByReferenceQueryHandler(
    IApplicationDbContext dbContext,
    IMapper mapper) : IQueryHandler<GetReservationsByReferenceQuery, GetReservationsByReferenceResult>
{
    #region Implementations

    public async Task<GetReservationsByReferenceResult> Handle(GetReservationsByReferenceQuery query, CancellationToken cancellationToken)
    {
        var reservations = await dbContext.InventoryReservations
            .AsNoTracking()
            .Where(x => x.ReferenceId == query.ReferenceId)
            .OrderByDescending(x => x.CreatedOnUtc)
            .ToListAsync(cancellationToken);

        var items = mapper.Map<List<ReservationDto>>(reservations);
        var response = new GetReservationsByReferenceResult(items);

        return response;
    }

    #endregion
}

