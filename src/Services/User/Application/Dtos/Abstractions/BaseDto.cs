namespace User.Application.Dtos.Abstractions;

public abstract class BaseDto<T>
{
    #region Fields, Properties and Indexers

    public T Id { get; set; } = default!;

    public DateTimeOffset CreatedOnUtc { get; set; }

    public DateTimeOffset LastModifiedAt { get; set; }

    public string CreatedBy { get; set; } = string.Empty;

    public string LastModifiedBy { get; set; } = string.Empty;

    #endregion
}
