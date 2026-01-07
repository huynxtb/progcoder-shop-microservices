#region using

using Basket.Domain.Entities;
using MediatR;

#endregion

namespace Basket.Domain.Events;

public record BasketCheckoutDomainEvent(
    ShoppingCartEntity Basket,
    CustomerDomainEvent Customer,
    AddressDomainEvent ShippingAddress,
    DiscountDomainEvent Discount) : INotification;

public sealed record CustomerDomainEvent(
    Guid? Id,
    string Name,
    string Email,
    string PhoneNumber);

public sealed record AddressDomainEvent(
    string AddressLine,
    string Subdivision,
    string City,
    string StateOrProvince,
    string Country,
    string PostalCode);

public sealed record DiscountDomainEvent(string CouponCode, decimal DiscountAmount);