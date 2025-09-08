namespace Inventory.Domain.Abstractions;

public interface IModificationAuditable
{
    #region Fields, Properties and Indexers

    DateTimeOffset? LastModifiedOnUtc { get; set; }

    string? LastModifiedBy { get; set; }

    #endregion

}
