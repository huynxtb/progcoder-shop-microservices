using Inventory.Domain.Enums;

namespace Inventory.Application.Dtos.InventoryReservations;

public sealed record ReservationDto
{
    #region Fields, Properties and Indexers

    public Guid Id { get; init; }

    public Guid ProductId { get; init; }

    public string ProductName { get; init; } = default!;

    public Guid ReferenceId { get; init; }

    public int Quantity { get; init; }

    public ReservationStatus Status { get; init; }

    public DateTimeOffset? ExpiresAt { get; init; }

    public DateTimeOffset CreatedOnUtc { get; init; }

    #endregion
}

