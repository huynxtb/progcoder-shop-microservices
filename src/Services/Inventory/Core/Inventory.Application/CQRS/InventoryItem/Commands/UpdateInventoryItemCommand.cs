#region using

using Inventory.Application.Data;
using Inventory.Application.Dtos.InventoryItems;
using Inventory.Application.Services;
using Inventory.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using BuildingBlocks.Abstractions.ValueObjects;

#endregion

namespace Inventory.Application.CQRS.InventoryItem.Commands;

public sealed record UpdateInventoryItemCommand(
    Guid InventoryItemId,
    UpdateInventoryItemDto Dto,
    Actor Actor) : ICommand<Guid>;

public sealed class UpdateInventoryItemCommandValidator : AbstractValidator<UpdateInventoryItemCommand>
{
    #region Ctors

    public UpdateInventoryItemCommandValidator()
    {
        RuleFor(x => x.InventoryItemId)
            .NotEmpty()
            .WithMessage(MessageCode.InventoryItemIdIsRequired);

        RuleFor(x => x.Dto)
            .NotNull()
            .WithMessage(MessageCode.BadRequest)
            .DependentRules(() =>
            {
                RuleFor(x => x.Dto.ProductId)
                    .NotEmpty()
                    .WithMessage(MessageCode.ProductIdIsRequired);

                RuleFor(x => x.Dto.LocationId)
                    .NotEmpty()
                    .WithMessage(MessageCode.LocationIsRequired);
            });
    }

    #endregion
}

public sealed class UpdateInventoryItemCommandHandler(
    IApplicationDbContext dbContext,
    ICatalogApiService catalogApi,
    ICatalogGrpcService catalogGrpc) : ICommandHandler<UpdateInventoryItemCommand, Guid>
{
    #region Implementations

    public async Task<Guid> Handle(UpdateInventoryItemCommand command, CancellationToken cancellationToken)
    {
        var dto = command.Dto;

        var entity = await dbContext.InventoryItems
            .SingleOrDefaultAsync(x => x.Id == command.InventoryItemId, cancellationToken)
            ?? throw new NotFoundException(MessageCode.ResourceNotFound);

        var productByApi = await catalogApi.GetProductByIdAsync(dto.ProductId.ToString())
            ?? throw new ClientValidationException(MessageCode.ProductIsNotExists, dto.ProductId);

        var productByGrpc = await catalogGrpc.GetProductByIdAsync(dto.ProductId.ToString(), cancellationToken)
            ?? throw new ClientValidationException(MessageCode.ProductIsNotExists, dto.ProductId);

        entity.Update(
            locationId: dto.LocationId,
            performedBy: command.Actor.ToString(),
            productId: productByGrpc.Product.Id,
            productName: productByGrpc.Product.Name!);

        dbContext.InventoryItems.Update(entity);
        await dbContext.SaveChangesAsync(cancellationToken);

        return entity.Id;
    }

    #endregion
}

