namespace Application.Dtos.Abstractions;

public abstract class BaseDto<T>
{
    #region Fields, Properties and Indexers

    public T Id { get; set; } = default!;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public DateTime LastModifiedAt { get; set; } = DateTime.UtcNow;

    public string CreatedBy { get; set; } = string.Empty;

    public string LastModifiedBy { get; set; } = string.Empty;

    #endregion
}
