namespace Inventory.Application.Dtos.Abstractions;

public interface ICreationAuditDto
{
    #region Fields, Properties and Indexers

    DateTimeOffset CreatedOnUtc { get; set; }

    string? CreatedBy { get; set; }

    #endregion
}
