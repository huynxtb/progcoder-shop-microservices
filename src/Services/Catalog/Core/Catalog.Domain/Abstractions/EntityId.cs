namespace Catalog.Domain.Abstractions;

public abstract class EntityId<T> : IEntityId<T>
{
    #region Fields, Properties and Indexers

    public T Id { get; set; } = default!;

    #endregion

}
