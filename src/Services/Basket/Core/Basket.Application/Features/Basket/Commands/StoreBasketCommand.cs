#region using

using Basket.Application.Dtos.Baskets;
using Basket.Application.Repositories;
using Basket.Application.Services;

#endregion

namespace Basket.Application.Features.Basket.Commands;

public record StoreBasketCommand(string UserId, StoreShoppingCartDto Dto) : ICommand<Guid>;

public class StoreBasketCommandValidator : AbstractValidator<StoreBasketCommand>
{
    #region Ctors

    public StoreBasketCommandValidator()
    {
        RuleFor(x => x.UserId)
            .NotEmpty()
            .WithMessage(MessageCode.UserIdIsRequired);

        RuleFor(x => x.Dto)
            .NotNull()
            .WithMessage(MessageCode.BadRequest)
            .DependentRules(() =>
            {
                RuleFor(x => x.Dto.Items)
                    .NotEmpty()
                    .WithMessage(MessageCode.BadRequest);

                RuleForEach(x => x.Dto.Items).ChildRules(items =>
                {
                    items.RuleFor(i => i.ProductId)
                        .NotEmpty()
                        .WithMessage(MessageCode.ProductIdIsRequired);
                    items.RuleFor(i => i.Quantity)
                        .GreaterThan(0)
                        .WithMessage(MessageCode.QuantityIsRequired);
                });
            });
    }

    #endregion
}

public class StoreBasketCommandHandler(IBasketRepository repository, ICatalogGrpcService catalogGrpc) : ICommandHandler<StoreBasketCommand, Guid>
{
    #region Implementations

    public async Task<Guid> Handle(StoreBasketCommand command, CancellationToken cancellationToken)
    {
        var dto = command.Dto;

        var basket = await repository.GetBasketAsync(command.UserId, cancellationToken);

        var products = await catalogGrpc.GetProductsAsync(
            ids: dto.Items.Select(x => x.ProductId.ToString()).ToArray(),
            cancellationToken: cancellationToken);
        
        basket.Clear();
        
        foreach (var item in dto.Items)
        {
            var product = products!.Items!.FirstOrDefault(x => x.Id == item.ProductId) 
                ?? throw new ClientValidationException(MessageCode.ProductIsNotExists, item.ProductId);

            basket.AddOrIncreaseItem(
                    productId: product.Id,
                    productName: product.Name,
                    productImage: product.Thumbnail,
                    price: product.Price,
                    quantity: item.Quantity);
        }

        await repository.StoreBasketAsync(command.UserId, basket, cancellationToken);

        return basket.Id;
    }

    #endregion
}