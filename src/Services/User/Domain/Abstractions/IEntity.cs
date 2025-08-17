namespace User.Domain.Abstractions;

public interface IEntity<T> : IEntity
{
    #region Fields, Properties and Indexers

    public T Id { get; set; }

    #endregion

}

public interface IEntity
{
    #region Fields, Properties and Indexers

    public DateTimeOffset CreatedOnUtc { get; set; }

    public string? CreatedBy { get; set; }

    public DateTimeOffset? LastModifiedOnUtc { get; set; }

    public string? LastModifiedBy { get; set; }

    #endregion
}
