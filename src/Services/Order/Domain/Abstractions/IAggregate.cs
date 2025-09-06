namespace Order.Domain.Abstractions;

public interface IAggregate<T> : IAggregate, IEntityId<T>
{
}

public interface IAggregate : ICreationAuditable, IModificationAuditable
{
    #region Fields, Properties and Indexers

    IReadOnlyList<IDomainEvent> DomainEvents { get; }

    IDomainEvent[] ClearDomainEvents();

    #endregion

}
