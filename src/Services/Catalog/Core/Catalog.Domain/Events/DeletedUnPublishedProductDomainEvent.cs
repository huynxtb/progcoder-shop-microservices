#region using

using Catalog.Domain.Abstractions;

#endregion

namespace Catalog.Domain.Events;

public sealed record DeletedUnPublishedProductDomainEvent(Guid ProductId) : IDomainEvent;

