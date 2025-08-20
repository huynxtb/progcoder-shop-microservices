namespace User.Application.Dtos.Abstractions;

public abstract class EntityDto<T> : IDtoId<T>, IAuditableDto
{
    #region Fields, Properties and Indexers

    public T Id { get; init; } = default!;

    public DateTimeOffset CreatedOnUtc { get; set; }

    public string? CreatedBy { get; set; }

    public DateTimeOffset? LastModifiedOnUtc { get; set; }

    public string? LastModifiedBy { get; set; }

    #endregion
}
