#region using

using Basket.Application.Dtos.Baskets;
using Basket.Application.Repositories;
using Basket.Domain.Entities;

#endregion

namespace Basket.Application.CQRS.Basket.Commands;

public record StoreBasketCommand(string UserId, StoreShoppingCartDto Dto) : ICommand<Guid>;

public class CreateProductCommandValidator : AbstractValidator<StoreBasketCommand>
{
    #region Ctors

    public CreateProductCommandValidator()
    {
        RuleFor(x => x.UserId)
            .NotNull()
            .WithMessage(MessageCode.UserIdIsRequired);

        RuleFor(x => x.Dto)
            .NotNull()
            .WithMessage(MessageCode.BadRequest)
            .DependentRules(() =>
            {
                RuleFor(x => x.Dto.Items)
                    .NotEmpty()
                    .WithMessage(MessageCode.BadRequest);
                
                RuleForEach(x => x.Dto.Items).ChildRules(items => {
                    items.RuleFor(i => i.ProductId)
                        .NotEmpty()
                        .WithMessage(MessageCode.ProductIdIsRequired);
                    items.RuleFor(i => i.Quantity)
                        .NotEmpty()
                        .WithMessage(MessageCode.QuantityIsRequired);
                });
            });

    }

    #endregion
}

public class CreateProductCommandHandler(IBasketRepository repository) : ICommandHandler<StoreBasketCommand, Guid>
{
    #region Implementations

    public async Task<Guid> Handle(StoreBasketCommand command, CancellationToken cancellationToken)
    {
        var dto = command.Dto;
        var shoppingCart = new ShoppingCartEntity
        {

        };

        await repository.StoreBasketAsync(command.UserId, shoppingCart, cancellationToken);

        return shoppingCart.Id;
    }

    #endregion
}