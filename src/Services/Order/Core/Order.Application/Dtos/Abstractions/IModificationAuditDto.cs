namespace Order.Application.Dtos.Abstractions;

public interface IModificationAuditDto
{
    #region Fields, Properties and Indexers

    DateTimeOffset? LastModifiedOnUtc { get; set; }

    string? LastModifiedBy { get; set; }

    #endregion

}
