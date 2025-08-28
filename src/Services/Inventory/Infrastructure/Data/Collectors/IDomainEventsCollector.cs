#region using

using Inventory.Domain.Abstractions;

#endregion

namespace Inventory.Infrastructure.Data.Collectors;

public interface IDomainEventsCollector
{
    #region Methods

    void AddRange(IEnumerable<IDomainEvent> events);

    IReadOnlyList<IDomainEvent> Drain();

    #endregion
}
