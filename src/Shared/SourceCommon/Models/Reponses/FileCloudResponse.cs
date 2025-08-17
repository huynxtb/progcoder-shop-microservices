namespace SourceCommon.Models.Reponses;

public sealed class FileCloudResponse
{
    #region Fields, Properties and Indexers

    public string FileCloudId { get; set; } = Guid.NewGuid().ToString();

    public string? FolderName { get; set; }

    public string? OriginalFileName { get; set; }

    public string? FileName { get; set; }

    public long FileSize { get; set; }

    public string? ContentType { get; set; }

    public string? PublicURL { get; set; }

    #endregion
}
