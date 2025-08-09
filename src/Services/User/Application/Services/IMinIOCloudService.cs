using SourceCommon.Models.Reponses;
using Microsoft.AspNetCore.Http;

namespace Application.Services;

public interface IMinIOCloudService
{
    Task<List<FileCloudResponse>> UploadFileAsync(List<IFormFile> files, string bucketName, bool isPublicBucket = false);
    Task<Stream> DownloadFileAsync(string bucketName, string objectName);
    Task<string> GetShareLinkAsync(string bucketName, string objectName, int expireTime);
}
