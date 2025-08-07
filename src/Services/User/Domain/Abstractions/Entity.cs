namespace Domain.Abstractions;

public abstract class Entity<T> : IEntity<T>
{
    public T Id { get; set; } = default!;

    public DateTime? CreatedAt { get; set; }

    public string? CreatedBy { get; set; }

    public DateTime? LastModifiedAt { get; set; }

    public string? LastModifiedBy { get; set; }
}
