namespace Discount.Application.Dtos.Abstractions;

public abstract class AuditableDto : IAuditableDto
{
    #region Fields, Properties and Indexers

    public DateTimeOffset CreatedOnUtc { get; set; }

    public string? CreatedBy { get; set; }

    public DateTimeOffset? LastModifiedOnUtc { get; set; }

    public string? LastModifiedBy { get; set; }

    #endregion
}

public interface IAuditableDto : ICreationAuditDto, IModificationAuditDto { }