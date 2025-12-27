#region using

using Basket.Application.Dtos.Baskets;
using Basket.Application.Repositories;
using MediatR;
using BuildingBlocks.Validators;
using Basket.Domain.Events;
using Basket.Application.Services;

#endregion

namespace Basket.Application.CQRS.Basket.Commands;

public sealed record BasketCheckoutCommand(string UserId, BasketCheckoutDto Dto) : ICommand<Guid>;

public sealed class BasketCheckoutCommandValidator : AbstractValidator<BasketCheckoutCommand>
{
    #region Ctors

    public BasketCheckoutCommandValidator()
    {
        RuleFor(x => x.UserId)
            .NotEmpty()
            .WithMessage(MessageCode.UserIdIsRequired);

        RuleFor(x => x.Dto)
            .NotNull()
            .WithMessage(MessageCode.BadRequest)
            .DependentRules(() =>
            {
                // Customer validation
                RuleFor(x => x.Dto.Customer)
                    .NotNull()
                    .WithMessage(MessageCode.BadRequest)
                    .DependentRules(() =>
                    {
                        RuleFor(x => x.Dto.Customer.Name)
                            .NotEmpty()
                            .WithMessage(MessageCode.NameIsRequired)
                            .MaximumLength(255)
                            .WithMessage(MessageCode.Max255Characters);

                        RuleFor(x => x.Dto.Customer.Email)
                            .NotEmpty()
                            .WithMessage(MessageCode.EmailIsRequired)
                            .EmailAddress()
                            .WithMessage(MessageCode.InvalidEmailAddress)
                            .MaximumLength(255)
                            .WithMessage(MessageCode.Max255Characters);

                        RuleFor(x => x.Dto.Customer.PhoneNumber)
                            .NotEmpty()
                            .WithMessage(MessageCode.PhoneNumberIsRequired)
                            .IsValidPhoneNumber()
                            .WithMessage(MessageCode.InvalidPhoneNumber);
                    });

                // Shipping Address validation
                RuleFor(x => x.Dto.ShippingAddress)
                    .NotNull()
                    .WithMessage(MessageCode.BadRequest)
                    .DependentRules(() =>
                    {
                        RuleFor(x => x.Dto.ShippingAddress.AddressLine)
                            .NotEmpty()
                            .WithMessage(MessageCode.AddressLineIsRequired)
                            .MaximumLength(500)
                            .WithMessage(MessageCode.Max500Characters);

                        RuleFor(x => x.Dto.ShippingAddress.Ward)
                            .NotEmpty()
                            .WithMessage(MessageCode.WardIsRequired)
                            .MaximumLength(100)
                            .WithMessage(MessageCode.Max100Characters);

                        RuleFor(x => x.Dto.ShippingAddress.District)
                            .NotEmpty()
                            .WithMessage(MessageCode.DistrictIsRequired)
                            .MaximumLength(100)
                            .WithMessage(MessageCode.Max100Characters);

                        RuleFor(x => x.Dto.ShippingAddress.City)
                            .NotEmpty()
                            .WithMessage(MessageCode.CityIsRequired)
                            .MaximumLength(100)
                            .WithMessage(MessageCode.Max100Characters);

                        RuleFor(x => x.Dto.ShippingAddress.Country)
                            .NotEmpty()
                            .WithMessage(MessageCode.CountryIsRequired)
                            .MaximumLength(100)
                            .WithMessage(MessageCode.Max100Characters);

                        RuleFor(x => x.Dto.ShippingAddress.State)
                            .NotEmpty()
                            .WithMessage(MessageCode.StateIsRequired)
                            .MaximumLength(100)
                            .WithMessage(MessageCode.Max100Characters);

                        RuleFor(x => x.Dto.ShippingAddress.ZipCode)
                            .NotEmpty()
                            .WithMessage(MessageCode.ZipCodeIsRequired)
                            .MaximumLength(20)
                            .WithMessage(MessageCode.Max20Characters);
                    });

                // Coupon Code validation (optional)
                When(x => !string.IsNullOrWhiteSpace(x.Dto.CouponCode), () =>
                {
                    RuleFor(x => x.Dto.CouponCode)
                        .MaximumLength(50)
                        .WithMessage(MessageCode.Max50Characters);
                });
            });
    }

    #endregion
}

public sealed class BasketCheckoutCommandHandler(
    IBasketRepository basketRepo, 
    IMediator mediator, 
    IDiscountGrpcService discountGrpc,
    ICatalogGrpcService catalogGrpc) 
    : ICommandHandler<BasketCheckoutCommand, Guid>
{
    #region Implementations

    public async Task<Guid> Handle(BasketCheckoutCommand command, CancellationToken cancellationToken)
    {
        var dto = command.Dto;
        decimal discountAmt = 0m;
        string couponCode = string.Empty;

        var basket = await basketRepo.GetBasketAsync(command.UserId, cancellationToken);

        if (basket.Items == null || basket.Items.Count == 0) throw new ClientValidationException(MessageCode.BasketIsRequired);

        if (!string.IsNullOrWhiteSpace(dto.CouponCode))
        {
            var productsResponse = await catalogGrpc.GetAllAvailableProductsAsync(cancellationToken: cancellationToken);

            if (productsResponse == null || productsResponse.Items == null || productsResponse.Items.Count == 0)
            {
                throw new ClientValidationException(MessageCode.ProductsIsNotExistsOrNotInStock);
            }

            decimal amount = 0m;

            foreach (var item in basket.Items)
            {
                var productInfo = productsResponse.Items.FirstOrDefault(x => x.Id == item.ProductId)
                    ?? throw new ClientValidationException(MessageCode.ProductIsNotExistsOrNotInStock, item.ProductId);

                amount += item.Quantity * productInfo.Price;
            }

            var discountResult = await discountGrpc.EvaluateCouponAsync(dto.CouponCode, amount)
                ?? throw new ClientValidationException(MessageCode.CouponCodeIsNotExistsOrExpired);

            discountAmt = discountResult.DiscountAmount;
            couponCode = discountResult.CouponCode;
        }

        var customerEvent = new CustomerDomainEvent(
            Guid.Parse(command.UserId),
            dto.Customer.Name,
            dto.Customer.Email,
            dto.Customer.PhoneNumber);
        var shippingAddressEvent = new AddressDomainEvent(
            dto.ShippingAddress.AddressLine,
            dto.ShippingAddress.Ward,
            dto.ShippingAddress.District,
            dto.ShippingAddress.City,
            dto.ShippingAddress.Country,
            dto.ShippingAddress.State,
            dto.ShippingAddress.ZipCode);
        var discountEvent = new DiscountDomainEvent(couponCode, discountAmt);

        var @event = new BasketCheckoutDomainEvent(basket, customerEvent, shippingAddressEvent, discountEvent);

        await mediator.Publish(@event, cancellationToken);

        await basketRepo.DeleteBasketAsync(command.UserId, cancellationToken);

        return basket.Id;
    }

    #endregion
}
