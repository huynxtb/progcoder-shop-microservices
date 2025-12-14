#region using

using Order.Application.Data;
using Order.Application.Dtos.Orders;
using Order.Domain.Entities;
using Order.Domain.ValueObjects;
using Order.Application.Services;

#endregion

namespace Order.Application.CQRS.Order.Commands;

public sealed record CreateOrderCommand(CreateOrUpdateOrderDto Dto, Actor Actor) : ICommand<Guid>;

public sealed class CreateOrderCommandValidator : AbstractValidator<CreateOrderCommand>
{
    #region Ctors

    public CreateOrderCommandValidator()
    {
        RuleFor(x => x.Dto)
            .NotNull()
            .WithMessage(MessageCode.BadRequest)
            .DependentRules(() =>
            {
                RuleFor(x => x.Dto.Customer)
                    .NotNull()
                    .WithMessage(MessageCode.BadRequest)
                    .DependentRules(() =>
                    {
                        RuleFor(x => x.Dto.Customer.Name)
                            .NotEmpty()
                            .WithMessage(MessageCode.NameIsRequired);

                        RuleFor(x => x.Dto.Customer.Email)
                            .NotEmpty()
                            .WithMessage(MessageCode.EmailIsRequired)
                            .EmailAddress()
                            .WithMessage(MessageCode.InvalidEmailAddress);

                        RuleFor(x => x.Dto.Customer.PhoneNumber)
                            .NotEmpty()
                            .WithMessage(MessageCode.PhoneNumberIsRequired)
                            .IsValidPhoneNumber()
                            .WithMessage(MessageCode.InvalidPhoneNumber);
                    });

                RuleFor(x => x.Dto.ShippingAddress)
                    .NotNull()
                    .WithMessage(MessageCode.BadRequest)
                    .DependentRules(() =>
                    {
                        RuleFor(x => x.Dto.ShippingAddress.Name)
                            .NotEmpty()
                            .WithMessage(MessageCode.NameIsRequired);

                        RuleFor(x => x.Dto.ShippingAddress.EmailAddress)
                            .NotEmpty()
                            .WithMessage(MessageCode.EmailIsRequired)
                            .EmailAddress()
                            .WithMessage(MessageCode.InvalidEmailAddress);

                        RuleFor(x => x.Dto.ShippingAddress.AddressLine)
                            .NotEmpty()
                            .WithMessage(MessageCode.AddressLineIsRequired);

                        RuleFor(x => x.Dto.ShippingAddress.Country)
                            .NotEmpty()
                            .WithMessage(MessageCode.CountryIsRequired);

                        RuleFor(x => x.Dto.ShippingAddress.State)
                            .NotEmpty()
                            .WithMessage(MessageCode.StateIsRequired);

                        RuleFor(x => x.Dto.ShippingAddress.ZipCode)
                            .NotEmpty()
                            .WithMessage(MessageCode.ZipCodeIsRequired);
                    });

                RuleFor(x => x.Dto.OrderItems)
                    .NotNull()
                    .WithMessage(MessageCode.BadRequest)
                    .Must(items => items != null && items.Count > 0)
                    .WithMessage(MessageCode.OrderItemsIsRequired)
                    .DependentRules(() =>
                    {
                        RuleForEach(x => x.Dto.OrderItems).ChildRules(item =>
                        {
                            item.RuleFor(i => i.ProductId)
                                .NotEmpty()
                                .WithMessage(MessageCode.ProductIdIsRequired);

                            item.RuleFor(i => i.Quantity)
                                .GreaterThan(0)
                                .WithMessage(MessageCode.QuantityCannotBeNegative);
                        });
                    });
            });

    }

    #endregion
}

public sealed class CreateOrderCommandHandler(IApplicationDbContext dbContext, ICatalogGrpcService catalogGrpc, IDiscountGrpcService discountGrpc) : ICommandHandler<CreateOrderCommand, Guid>
{
    #region Implementations

    public async Task<Guid> Handle(CreateOrderCommand command, CancellationToken cancellationToken)
    {
        var dto = command.Dto;
        var orderId = Guid.NewGuid();
        var orderNo = OrderNo.Create();

        var customer = Customer.Of(
            dto.Customer.Id,
            dto.Customer.PhoneNumber,
            dto.Customer.Name,
            dto.Customer.Email);

        var shippingAddress = Address.Of(
            dto.ShippingAddress.Name,
            dto.ShippingAddress.EmailAddress!,
            dto.ShippingAddress.AddressLine,
            dto.ShippingAddress.Country,
            dto.ShippingAddress.State,
            dto.ShippingAddress.ZipCode);

        var order = OrderEntity.Create(id: orderId, 
            notes: dto.Notes,
            customer: customer, 
            orderNo: orderNo, 
            shippingAddress: shippingAddress, 
            performedBy: command.Actor.ToString());
        var productIds = dto.OrderItems.Select(x => x.ProductId.ToString()).ToArray();
        
        var productsResponse = await catalogGrpc.GetAllAvailableProductsAsync(cancellationToken: cancellationToken);

        if(productsResponse == null || productsResponse.Items == null || productsResponse.Items.Count == 0)
        {
            throw new ClientValidationException(MessageCode.ProductsIsNotExistsOrNotInStock);
        }

        foreach (var item in dto.OrderItems)
        {
            var productInfo = productsResponse.Items.FirstOrDefault(x => x.Id == item.ProductId)
                ?? throw new ClientValidationException(MessageCode.ProductIsNotExistsOrNotInStock, item.ProductId);

            var product = Product.Of(
                productInfo.Id,
                productInfo.Name,
                productInfo.Price,
                productInfo.Thumbnail);

            order.AddOrderItem(product, item.Quantity);
        }

        decimal discountAmt = 0m;
        string couponCode = string.Empty;

        if (!string.IsNullOrWhiteSpace(dto.CouponCode))
        {
            
            decimal amount = 0m;

            foreach (var item in dto.OrderItems)
            {
                var productInfo = productsResponse.Items.FirstOrDefault(x => x.Id == item.ProductId)
                    ?? throw new ClientValidationException(MessageCode.ProductIsNotExists, item.ProductId);

                amount += (item.Quantity * productInfo.Price);
            }

            var discountResult = await discountGrpc.EvaluateCouponAsync(dto.CouponCode, amount)
                ?? throw new ClientValidationException(MessageCode.CouponCodeIsNotExistsOrExpired);

            discountAmt = discountResult.DiscountAmount;
            couponCode = discountResult.CouponCode;

            await discountGrpc.ApplyCouponAsync(dto.CouponCode, amount);
        }

        var discount = Discount.Of(couponCode, discountAmt);
        order.ApplyDiscount(discount);
        order.OrderCreated();

        await dbContext.Orders.AddAsync(order, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);

        return order.Id;
    }

    #endregion
}