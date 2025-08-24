#region using

using User.Domain.Abstractions;

#endregion

namespace User.Infrastructure.Data.Collectors;

public interface IDomainEventsCollector
{
    #region Methods

    void AddRange(IEnumerable<IDomainEvent> events);

    IReadOnlyList<IDomainEvent> Drain();

    #endregion
}
