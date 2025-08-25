namespace SourceCommon.Models;

public sealed class UploadFileBytes
{
    #region Fields, Properties and Indexers

    public required string FileName { get; init; }

    public required string ContentType { get; init; }

    public required byte[] Bytes { get; init; }

    #endregion
}
