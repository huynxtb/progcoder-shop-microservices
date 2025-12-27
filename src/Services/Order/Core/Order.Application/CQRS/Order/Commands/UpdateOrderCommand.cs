#region using

using Microsoft.EntityFrameworkCore;
using Order.Application.Data;
using Order.Application.Dtos.Orders;
using Order.Application.Services;
using Order.Domain.Enums;
using Order.Domain.ValueObjects;

#endregion

namespace Order.Application.CQRS.Order.Commands;

public sealed record UpdateOrderCommand(Guid OrderId, CreateOrUpdateOrderDto Dto, Actor Actor) : ICommand<Guid>;

public sealed class UpdateOrderCommandValidator : AbstractValidator<UpdateOrderCommand>
{
    #region Ctors

    public UpdateOrderCommandValidator()
    {
        RuleFor(x => x.OrderId)
            .NotEmpty()
            .WithMessage(MessageCode.BadRequest);

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
                        RuleFor(x => x.Dto.ShippingAddress.AddressLine)
                            .NotEmpty()
                            .WithMessage(MessageCode.AddressLineIsRequired);

                        RuleFor(x => x.Dto.ShippingAddress.Ward)
                            .NotEmpty()
                            .WithMessage(MessageCode.WardIsRequired);

                        RuleFor(x => x.Dto.ShippingAddress.District)
                            .NotEmpty()
                            .WithMessage(MessageCode.DistrictIsRequired);

                        RuleFor(x => x.Dto.ShippingAddress.City)
                            .NotEmpty()
                            .WithMessage(MessageCode.CityIsRequired);

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

public sealed class UpdateOrderCommandHandler(IApplicationDbContext dbContext, ICatalogGrpcService catalogGrpc) : ICommandHandler<UpdateOrderCommand, Guid>
{
    #region Implementations

    public async Task<Guid> Handle(UpdateOrderCommand command, CancellationToken cancellationToken)
    {
        var existingOrder = await dbContext.Orders
            .Include(x => x.OrderItems)
            .SingleOrDefaultAsync(x => x.Id == command.OrderId, cancellationToken)
            ?? throw new NotFoundException(MessageCode.ResourceNotFound, command.OrderId);

        if (existingOrder.Status == OrderStatus.Delivered ||
            existingOrder.Status == OrderStatus.Canceled ||
            existingOrder.Status == OrderStatus.Refunded)
        {
            throw new ClientValidationException(MessageCode.OrderCannotBeUpdated);
        }

        var dto = command.Dto;
        var customer = Customer.Of(
            dto.Customer.Id,
            dto.Customer.PhoneNumber,
            dto.Customer.Name,
            dto.Customer.Email);
        var shippingAddress = Address.Of(
            dto.ShippingAddress.AddressLine,
            dto.ShippingAddress.Ward,
            dto.ShippingAddress.District,
            dto.ShippingAddress.City,
            dto.ShippingAddress.Country,
            dto.ShippingAddress.State,
            dto.ShippingAddress.ZipCode);

        existingOrder.UpdateCustomerInfo(customer, command.Actor.ToString());
        existingOrder.UpdateShippingAddress(shippingAddress, command.Actor.ToString());

        var productIds = dto.OrderItems
            .Select(x => x.ProductId.ToString())
            .Distinct()
            .ToArray();

        var productsResponse = await catalogGrpc.GetProductsAsync(ids: productIds, cancellationToken: cancellationToken);

        if (productsResponse == null || productsResponse.Items == null || productsResponse.Items.Count == 0)
        {
            throw new ClientValidationException(MessageCode.ProductIsNotExists);
        }

        var validProducts = productsResponse.Items.ToDictionary(p => p.Id, p => p);
        var dtoProductIdSet = dto.OrderItems.Select(i => i.ProductId).ToHashSet();
        var toRemove = existingOrder.OrderItems
            .Where(oi => !validProducts.ContainsKey(oi.Product.Id) || !dtoProductIdSet.Contains(oi.Product.Id))
            .Select(oi => oi.Product.Id)
            .ToList();

        foreach (var productId in toRemove)
        {
            existingOrder.RemoveOrderItem(productId);
        }

        foreach (var item in dto.OrderItems)
        {
            var alreadyProcessed = existingOrder.OrderItems.Any(oi => oi.Product.Id == item.ProductId) &&
                                    dto.OrderItems.First(i => i.ProductId == item.ProductId) != item;
            if (alreadyProcessed) continue;

            if (!validProducts.TryGetValue(item.ProductId, out var productInfo))
            {
                continue;
            }

            var existingItem = existingOrder.OrderItems.FirstOrDefault(oi => oi.Product.Id == item.ProductId);
            if (existingItem == null)
            {
                var product = Product.Of(
                    productInfo.Id,
                    productInfo.Name,
                    productInfo.Price,
                    productInfo.Thumbnail);

                existingOrder.AddOrderItem(product, item.Quantity);
            }
            else if (existingItem.Quantity != item.Quantity)
            {
                existingOrder.RemoveOrderItem(item.ProductId);

                var product = Product.Of(
                    productInfo.Id,
                    productInfo.Name,
                    productInfo.Price,
                    productInfo.Thumbnail);

                existingOrder.AddOrderItem(product, item.Quantity);
            }
        }

        dbContext.Orders.Update(existingOrder);
        await dbContext.SaveChangesAsync(cancellationToken);

        return existingOrder.Id;
    }

    #endregion
}
