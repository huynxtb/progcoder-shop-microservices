#region using

using MediatR;

#endregion

namespace Order.Domain.Abstractions;

public interface IDomainEvent : INotification
{
    #region Fields, Properties and Indexers

    Guid EventId => Guid.NewGuid();

    public DateTimeOffset OccurredOn => DateTime.Now;

    public string EventType => GetType()?.AssemblyQualifiedName ?? string.Empty;

    #endregion

}
