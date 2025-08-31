#region using

using Inventory.Application.Data;
using Inventory.Application.Dtos.InventoryItems;
using Inventory.Domain.Enums;
using Microsoft.EntityFrameworkCore;
using SourceCommon.Models.Reponses;

#endregion

namespace Inventory.Application.CQRS.InventoryItem.Commands;

public sealed record UpdateStockCommand(Guid InventoryItemId, UpdateStockDto Dto, Guid CurrentUserId) : ICommand<ResultSharedResponse<string>>;

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

                RuleFor(x => x.Dto.ChangeType)
                    .Must(status => Enum.IsDefined(typeof(InventoryChangeType), status))
                    .WithMessage(MessageCode.InventoryChangeTypeIsRequired);
            });
    }

    #endregion
}

public sealed class UpdateStockCommandHandler(IApplicationDbContext dbContext) : ICommandHandler<UpdateStockCommand, ResultSharedResponse<string>>
{
    #region Implementations

    public async Task<ResultSharedResponse<string>> Handle(UpdateStockCommand command, CancellationToken cancellationToken)
    {
        var dto = command.Dto;
        var entity = await dbContext.InventoryItems.SingleOrDefaultAsync(x => x.Id == dto.Id, cancellationToken)
            ?? throw new NotFoundException(MessageCode.ResourceNotFound);

        switch (dto.ChangeType)
        {
            case InventoryChangeType.Increase:
                entity.Increase(dto.Amount, dto.Source!, command.CurrentUserId.ToString());
                break;
            case InventoryChangeType.Decrease:
                entity.Decrease(dto.Amount, dto.Source!, command.CurrentUserId.ToString());
                break;
            default:
                throw new ClientValidationException(MessageCode.InventoryChangeTypeIsRequired);
        }

        dbContext.InventoryItems.Update(entity);
        await dbContext.SaveChangesAsync(cancellationToken);

        return ResultSharedResponse<string>.Success(
            data: entity.Id.ToString(),
            message: MessageCode.UpdateSuccess);
    }

    #endregion
}