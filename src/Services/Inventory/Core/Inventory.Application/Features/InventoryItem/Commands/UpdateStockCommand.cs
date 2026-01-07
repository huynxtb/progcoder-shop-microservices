#region using

using Inventory.Application.Dtos.InventoryItems;
using Inventory.Domain.Enums;
using Inventory.Domain.Abstractions;

#endregion

namespace Inventory.Application.Features.InventoryItem.Commands;

public sealed record UpdateStockCommand(
    Guid InventoryItemId,
    InventoryChangeType ChangeType,
    UpdateStockDto Dto,
    Actor Actor) : ICommand<Guid>;

public sealed class UpdateStockCommandValidator : AbstractValidator<UpdateStockCommand>
{
    #region Ctors

    public UpdateStockCommandValidator()
    {
        RuleFor(x => x.InventoryItemId)
            .NotEmpty()
            .WithMessage(MessageCode.InventoryItemIdIsRequired);

        RuleFor(x => x.Dto)
            .NotNull()
            .WithMessage(MessageCode.BadRequest)
            .DependentRules(() =>
            {
                RuleFor(x => x.Dto.Source)
                    .NotEmpty()
                    .WithMessage(MessageCode.SourceIsRequired);

                RuleFor(x => x.ChangeType)
                    .Must(status => Enum.IsDefined(typeof(InventoryChangeType), status))
                    .WithMessage(MessageCode.InventoryChangeTypeIsRequired);
            });
    }

    #endregion
}

public sealed class UpdateStockCommandHandler(IUnitOfWork unitOfWork) : ICommandHandler<UpdateStockCommand, Guid>
{
    #region Implementations

    public async Task<Guid> Handle(UpdateStockCommand command, CancellationToken cancellationToken)
    {
        var transaction = await unitOfWork.BeginTransactionAsync(cancellationToken);

        try
        {
            var dto = command.Dto;
            var entity = await unitOfWork.InventoryItems.FirstOrDefaultAsync(x => x.Id == command.InventoryItemId, cancellationToken)
                ?? throw new NotFoundException(MessageCode.ResourceNotFound);

            switch (command.ChangeType)
            {
                case InventoryChangeType.Increase:
                    entity.Increase(dto.Amount, dto.Source!, command.Actor.ToString());
                    break;
                case InventoryChangeType.Decrease:
                    entity.Decrease(dto.Amount, dto.Source!, command.Actor.ToString());
                    break;
                default:
                    throw new ClientValidationException(MessageCode.InventoryChangeTypeIsRequired);
            }

            unitOfWork.InventoryItems.Update(entity);

            await unitOfWork.SaveChangesAsync(cancellationToken);
            await transaction.CommitAsync(cancellationToken);

            return entity.Id;
        }
        catch (Exception)
        {
            await transaction.RollbackAsync(cancellationToken);
            throw;
        }
    }

    #endregion
}