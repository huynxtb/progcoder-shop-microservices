namespace Domain.Abstractions;

public interface IEntity<T> : IEntity
{
    #region Fields, Properties and Indexers

    public T Id { get; set; }

    #endregion

}

public interface IEntity
{
    #region Fields, Properties and Indexers

    public DateTime? CreatedAt { get; set; }

    public string? CreatedBy { get; set; }

    public DateTime? LastModifiedAt { get; set; }

    public string? LastModifiedBy { get; set; }

    #endregion
}
