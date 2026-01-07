#region using

using Inventory.Domain.Abstractions;using Inventory.Domain.Repositories;
using Inventory.Application.Dtos.Locations;
using Inventory.Domain.Entities;
using BuildingBlocks.Abstractions.ValueObjects;

#endregion

namespace Inventory.Application.Features.Location.Commands;

public sealed record CreateLocationCommand(CreateLocationDto Dto, Actor Actor) : ICommand<Guid>;

public sealed class CreateLocationCommandValidator : AbstractValidator<CreateLocationCommand>
{
    #region Ctors

    public CreateLocationCommandValidator()
    {
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

public sealed class CreateLocationCommandHandler(IUnitOfWork unitOfWork) 
    : ICommandHandler<CreateLocationCommand, Guid>
{
    #region Implementations

    public async Task<Guid> Handle(CreateLocationCommand command, CancellationToken cancellationToken)
    {
        var dto = command.Dto;
        var locationId = Guid.NewGuid();
        var entity = LocationEntity.Create(
            id: locationId,
            location: dto.Location!,
            performBy: command.Actor.ToString());

        await unitOfWork.Locations.AddAsync(entity, cancellationToken);
        await unitOfWork.SaveChangesAsync(cancellationToken);

        return locationId;
    }

    #endregion
}

