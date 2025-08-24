#region using

using User.Domain.Abstractions;

#endregion

namespace User.Infrastructure.Data.Collectors;

public sealed class DomainEventsCollector : IDomainEventsCollector
{
    #region Fields, Properties and Indexers

    private readonly List<IDomainEvent> _buffer = new();

    #endregion

    #region Implementations

    public void AddRange(IEnumerable<IDomainEvent> events) => _buffer.AddRange(events);

    public IReadOnlyList<IDomainEvent> Drain() { var x = _buffer.ToList(); _buffer.Clear(); return x; }

    #endregion
}