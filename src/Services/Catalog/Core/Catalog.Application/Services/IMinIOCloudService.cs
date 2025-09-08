namespace Catalog.Application.Services;

public interface IMinIOCloudService
{
    #region Methods

    Task<List<UploadFileResult>> UploadFilesAsync(
        List<UploadFileBytes> files, 
        string bucketName, 
        bool isPublicBucket = false, 
        CancellationToken ct = default);

    Task<string> GetShareLinkAsync(string bucketName, string objectName, int expireTime);

    #endregion

}
