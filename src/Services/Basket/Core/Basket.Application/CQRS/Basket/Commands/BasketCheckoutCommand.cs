//#region using

//using Basket.Application.Repositories;
//using FluentValidation;
//using MediatR;
//using Basket.Application.Dtos.Baskets;

//#endregion

//namespace Basket.Application.CQRS.Basket.Commands;

//public sealed record BasketCheckoutCommand(
//    string UserId,
//    BasketCheckoutCustomerDto Customer,
//    BasketCheckoutAddressDto ShippingAddress,
//    IReadOnlyCollection<BasketCheckoutItemDto> Items,
//    decimal TotalPrice
//) : ICommand<Unit>;

//public sealed class CheckoutCommandValidator : AbstractValidator<BasketCheckoutCommand>
//{
//    #region Ctors

//    public CheckoutCommandValidator()
//    {
//        RuleFor(x => x.UserId)
//            .NotEmpty()
//            .WithMessage(MessageCode.UserIdIsRequired);

//        RuleFor(x => x.BasketId)
//            .NotEmpty()
//            .WithMessage(MessageCode.BadRequest);

//        RuleFor(x => x.PerformedBy)
//            .NotEmpty()
//            .WithMessage(MessageCode.BadRequest);

//        RuleFor(x => x.Customer)
//            .NotNull()
//            .WithMessage(MessageCode.BadRequest);

//        RuleFor(x => x.ShippingAddress)
//            .NotNull()
//            .WithMessage(MessageCode.BadRequest);

//        RuleFor(x => x.Items)
//            .NotEmpty()
//            .WithMessage(MessageCode.BadRequest);

//        RuleFor(x => x.TotalPrice)
//            .GreaterThan(0)
//            .WithMessage(MessageCode.BadRequest);
//    }

//    #endregion
//}

//public sealed class CheckoutCommandHandler(IBasketRepository repository) : ICommandHandler<BasketCheckoutCommand, Unit>
//{
//    #region Implementations

//    public async Task<Unit> Handle(BasketCheckoutCommand command, CancellationToken cancellationToken)
//    {
//        var basket = await repository.GetBasketAsync(command.UserId, cancellationToken);

//        if (basket.Items == null || basket.Items.Count == 0)
//        {
//            throw new ClientValidationException(MessageCode.BadRequest);
//        }

//        await repository.DeleteBasketAsync(command.UserId, cancellationToken);

//        return Unit.Value;
//    }

//    #endregion
//}
