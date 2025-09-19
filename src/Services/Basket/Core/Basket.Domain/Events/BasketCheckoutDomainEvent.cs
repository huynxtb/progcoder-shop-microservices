#region using

using Basket.Domain.Entities;
using MediatR;

#endregion

namespace Basket.Domain.Events;

public record BasketCheckoutDomainEvent(
    ShoppingCartEntity Basket,
    BasketCheckoutCustomerDomainEvent Customer,
    BasketCheckoutAddressDomainEvent ShippingAddress) : INotification;

public sealed record BasketCheckoutCustomerDomainEvent(
    Guid? Id, 
    string Name, 
    string Email, 
    string PhoneNumber);

public sealed record BasketCheckoutAddressDomainEvent(
    string Name, 
    string EmailAddress, 
    string AddressLine, 
    string Country,
    string State, 
    string ZipCode);