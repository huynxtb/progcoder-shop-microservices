#region using

using Inventory.Domain.Abstractions;

#endregion

namespace Inventory.Domain.Entities;

public sealed class OutboxMessageEntity : Entity<Guid>
{
    #region MyRegion

    public string? EventType { get; set; }

    public string? Content { get; set; }

    public DateTime OccurredOnUtc { get; set; }

    public DateTime? ProcessedOnUtc { get; set; }

    public string? Error { get; set; }

    #endregion
}
