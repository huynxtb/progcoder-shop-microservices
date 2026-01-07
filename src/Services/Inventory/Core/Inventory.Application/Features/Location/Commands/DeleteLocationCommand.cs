#region using

using Inventory.Domain.Abstractions;using Inventory.Domain.Repositories;
using Inventory.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

#endregion

namespace Inventory.Application.Features.Location.Commands;

public sealed record DeleteLocationCommand(Guid LocationId) : ICommand<Unit>;

public sealed class DeleteLocationCommandValidator : AbstractValidator<DeleteLocationCommand>
{
    #region Ctors

    public DeleteLocationCommandValidator()
    {
        RuleFor(x => x.LocationId)
            .NotEmpty()
            .WithMessage(MessageCode.IdIsRequired);
    }

    #endregion
}

public sealed class DeleteLocationCommandHandler(IUnitOfWork unitOfWork) 
    : ICommandHandler<DeleteLocationCommand, Unit>
{
    #region Implementations

    public async Task<Unit> Handle(DeleteLocationCommand command, CancellationToken cancellationToken)
    {
        var entity = await unitOfWork.Locations
            .FirstOrDefaultAsync(x => x.Id == command.LocationId, cancellationToken)
            ?? throw new NotFoundException(MessageCode.ResourceNotFound);

        var isInUse = await unitOfWork.InventoryItems
            .AnyAsync(x => x.LocationId == command.LocationId, cancellationToken);

        if (isInUse)
        {
            throw new ClientValidationException(MessageCode.BadRequest, command.LocationId);
        }

        unitOfWork.Locations.Remove(entity);
        await unitOfWork.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }

    #endregion
}

