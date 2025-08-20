namespace User.Domain.Abstractions;

public interface ICreationAuditable
{
    #region Fields, Properties and Indexers

    DateTimeOffset CreatedOnUtc { get; set; }

    string? CreatedBy { get; set; }

    #endregion

}
