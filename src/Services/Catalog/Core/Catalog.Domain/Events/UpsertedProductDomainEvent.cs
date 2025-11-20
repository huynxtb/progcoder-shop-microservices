#region using

using Catalog.Domain.Abstractions;
using Catalog.Domain.Enums;

#endregion

namespace Catalog.Domain.Events;

public sealed record UpsertedProductDomainEvent(
    Guid Id,
    string Name,
    string Sku,
    string Slug,
    decimal Price,
    decimal? SalesPrice,
    List<string>? Categories,
    List<string>? Images,
    string Thumbnail,
    ProductStatus Status,
    DateTimeOffset CreatedOnUtc,
    string CreatedBy,
    DateTimeOffset? LastModifiedOnUtc,
    string? LastModifiedBy) : IDomainEvent;
