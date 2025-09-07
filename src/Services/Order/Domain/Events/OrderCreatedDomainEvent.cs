#region using

using Order.Domain.Abstractions;
using Order.Domain.Entities;

#endregion

namespace Order.Domain.Events;

public sealed record class OrderCreatedDomainEvent(OrderEntity Order) : IDomainEvent;