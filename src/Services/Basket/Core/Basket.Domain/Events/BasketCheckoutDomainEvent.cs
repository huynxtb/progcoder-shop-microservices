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
    string Name, 
    string EmailAddress, 
    string AddressLine, 
    string Country,
    string State, 
    string ZipCode);

public sealed record DiscountDomainEvent(string CouponCode, decimal DiscountAmount);