namespace User.Domain.Abstractions;

public abstract class Entity<T> : IEntity<T>
{
    #region Fields, Properties and Indexers

    public T Id { get; set; } = default!;

    public DateTimeOffset CreatedOnUtc { get; set; }

    public string? CreatedBy { get; set; }

    public DateTimeOffset? LastModifiedOnUtc { get; set; }

    public string? LastModifiedBy { get; set; }

    #endregion

}
