using MediatR;

namespace User.Domain.Abstractions;
public interface IDomainEvent : INotification
{
    Guid EventId => Guid.NewGuid();
    public DateTime OccurredOn => DateTime.Now;
    public string EventType => GetType()?.AssemblyQualifiedName ?? string.Empty;
}
