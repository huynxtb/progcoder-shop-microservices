namespace Inventory.Application.Dtos.InventoryReservations;

public sealed record CreateReservationDto
{
    #region Fields, Properties and Indexers

    public Guid ProductId { get; init; }

    public string ProductName { get; init; } = default!;

    public Guid ReferenceId { get; init; }

    public int Quantity { get; init; }

    public DateTimeOffset? ExpiresAt { get; init; }

    #endregion
}

