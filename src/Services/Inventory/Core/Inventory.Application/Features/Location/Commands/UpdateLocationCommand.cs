#region using

using Inventory.Application.Data;
using Inventory.Application.Dtos.Locations;
using Inventory.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using BuildingBlocks.Abstractions.ValueObjects;

#endregion

namespace Inventory.Application.Features.Location.Commands;

public sealed record UpdateLocationCommand(
    Guid LocationId,
    UpdateLocationDto Dto,
    Actor Actor) : ICommand<Guid>;

public sealed class UpdateLocationCommandValidator : AbstractValidator<UpdateLocationCommand>
{
    #region Ctors

    public UpdateLocationCommandValidator()
    {
        RuleFor(x => x.LocationId)
            .NotEmpty()
            .WithMessage(MessageCode.IdIsRequired);

        RuleFor(x => x.Dto)
            .NotNull()
            .WithMessage(MessageCode.BadRequest)
            .DependentRules(() =>
            {
                RuleFor(x => x.Dto.Location)
                    .NotEmpty()
                    .WithMessage(MessageCode.LocationIsRequired);
            });
    }

    #endregion
}

public sealed class UpdateLocationCommandHandler(IApplicationDbContext dbContext) 
    : ICommandHandler<UpdateLocationCommand, Guid>
{
    #region Implementations

    public async Task<Guid> Handle(UpdateLocationCommand command, CancellationToken cancellationToken)
    {
        var entity = await dbContext.Locations
            .SingleOrDefaultAsync(x => x.Id == command.LocationId, cancellationToken)
            ?? throw new NotFoundException(MessageCode.ResourceNotFound);

        entity.Update(
            location: command.Dto.Location!,
            performBy: command.Actor.ToString());

        dbContext.Locations.Update(entity);
        await dbContext.SaveChangesAsync(cancellationToken);

        return entity.Id;
    }

    #endregion
}

