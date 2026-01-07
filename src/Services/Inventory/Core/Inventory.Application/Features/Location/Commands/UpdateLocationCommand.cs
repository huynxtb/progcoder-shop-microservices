#region using

using Inventory.Domain.Abstractions;using Inventory.Domain.Repositories;
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

public sealed class UpdateLocationCommandHandler(IUnitOfWork unitOfWork) 
    : ICommandHandler<UpdateLocationCommand, Guid>
{
    #region Implementations

    public async Task<Guid> Handle(UpdateLocationCommand command, CancellationToken cancellationToken)
    {
        var entity = await unitOfWork.Locations
            .FirstOrDefaultAsync(x => x.Id == command.LocationId, cancellationToken)
            ?? throw new NotFoundException(MessageCode.ResourceNotFound);

        entity.Update(
            location: command.Dto.Location!,
            performBy: command.Actor.ToString());

        unitOfWork.Locations.Update(entity);
        await unitOfWork.SaveChangesAsync(cancellationToken);

        return entity.Id;
    }

    #endregion
}

