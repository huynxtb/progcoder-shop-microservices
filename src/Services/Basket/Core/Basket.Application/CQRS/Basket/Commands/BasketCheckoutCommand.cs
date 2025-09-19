#region using

using Basket.Application.Dtos.Baskets;
using Basket.Application.Repositories;
using EventSourcing.Events.Baskets;
using MediatR;
using BuildingBlocks.Validators;
using Basket.Domain.Events;

#endregion

namespace Basket.Application.CQRS.Basket.Commands;

public sealed record BasketCheckoutCommand(string UserId, BasketCheckoutDto Dto) : ICommand<Unit>;

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
                        RuleFor(x => x.Dto.ShippingAddress.Name)
                            .NotEmpty()
                            .WithMessage(MessageCode.NameIsRequired)
                            .MaximumLength(255)
                            .WithMessage(MessageCode.Max255Characters);

                        RuleFor(x => x.Dto.ShippingAddress.EmailAddress)
                            .NotEmpty()
                            .WithMessage(MessageCode.EmailIsRequired)
                            .EmailAddress()
                            .WithMessage(MessageCode.InvalidEmailAddress)
                            .MaximumLength(255)
                            .WithMessage(MessageCode.Max255Characters);

                        RuleFor(x => x.Dto.ShippingAddress.AddressLine)
                            .NotEmpty()
                            .WithMessage(MessageCode.AddressLineIsRequired)
                            .MaximumLength(500)
                            .WithMessage(MessageCode.Max500Characters);

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

public sealed class BasketCheckoutCommandHandler(IBasketRepository basketRepo, IOutboxRepository outboxRepo, IMediator mediator) : ICommandHandler<BasketCheckoutCommand, Unit>
{
    #region Implementations

    public async Task<Unit> Handle(BasketCheckoutCommand command, CancellationToken cancellationToken)
    {
        var dto = command.Dto;

        var basket = await basketRepo.GetBasketAsync(command.UserId, cancellationToken);

        if (basket.Items == null || basket.Items.Count == 0)
        {
            throw new ClientValidationException(MessageCode.BadRequest);
        }

        var message = new BasketCheckoutIntegrationEvent
        {
            BasketId = basket.Id,
            UserId = command.UserId,
            TotalPrice = basket.TotalPrice,
            Customer = new BasketCheckoutCustomer()
            {
                Id = Guid.Parse(command.UserId),
                Email = dto.Customer.Email,
                Name = dto.Customer.Name,
                PhoneNumber = dto.Customer.PhoneNumber
            },
            ShippingAddress = new BasketCheckoutAddress()
            {
                AddressLine = dto.ShippingAddress.AddressLine,
                Country = dto.ShippingAddress.Country,
                EmailAddress = dto.ShippingAddress.EmailAddress,
                Name = dto.ShippingAddress.Name,
                State = dto.ShippingAddress.State,
                ZipCode = dto.ShippingAddress.ZipCode
            },
            Items = basket.Items.Select(item => new BasketCheckoutItem
            {
                ProductId = item.ProductId,
                Quantity = item.Quantity
            }).ToList()
        };

        
        var customer = new BasketCheckoutCustomerDomainEvent(
            Guid.Parse(command.UserId), 
            dto.Customer.Name, 
            dto.Customer.Email, 
            dto.Customer.PhoneNumber);
        var shippingAddress = new BasketCheckoutAddressDomainEvent(
            dto.ShippingAddress.Name, 
            dto.ShippingAddress.EmailAddress, 
            dto.ShippingAddress.AddressLine, 
            dto.ShippingAddress.Country, 
            dto.ShippingAddress.State, 
            dto.ShippingAddress.ZipCode);

        var @event = new BasketCheckoutDomainEvent(basket, customer, shippingAddress);

        await mediator.Publish(@event, cancellationToken);
        await basketRepo.DeleteBasketAsync(command.UserId, cancellationToken);

        return Unit.Value;
    }

    #endregion
}
