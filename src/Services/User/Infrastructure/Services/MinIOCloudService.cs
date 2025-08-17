#region using

using User.Application.Services;
using Microsoft.AspNetCore.Http;
using Minio.DataModel.Args;
using Minio.Exceptions;
using Minio;
using SourceCommon.Models.Reponses;

#endregion

namespace User.Infrastructure.Services;

public class MinIOCloudService : IMinIOCloudService
{
    #region Fields, Properties and Indexers

    private readonly IMinioClient _minioClient;
    private readonly string _endPoint;

    #endregion

    #region Ctors

    public MinIOCloudService(IMinioClient minioClient)
    {
        _minioClient = minioClient;
        _endPoint = _minioClient.Config.Endpoint;
    }

    #endregion

    #region Methods

    public async Task<List<FileCloudResponse>> UploadFileAsync(List<IFormFile> files, string bucketName, bool isPublicBucket = false)
    {
        var fileResponse = new List<FileCloudResponse>();

        try
        {
            if (files.Count <= 0) return fileResponse;

            var isExists = await _minioClient.BucketExistsAsync(new BucketExistsArgs().WithBucket(bucketName));

            if (!isExists)
            {
                await _minioClient.MakeBucketAsync(new MakeBucketArgs().WithBucket(bucketName));
                if (isPublicBucket)
                {
                    // Define public policy for the bucket
                    string publicReadPolicy = @"
                                                {
                                                    ""Version"": ""2012-10-17"",
                                                    ""Statement"": [
                                                        {
                                                            ""Effect"": ""Allow"",
                                                            ""Principal"": ""*"",
                                                            ""Action"": ""s3:GetObject"",
                                                            ""Resource"": ""arn:aws:s3:::" + bucketName + @"/*""
                                                        }
                                                    ]
                                                }";

                    var policyArgs = new SetPolicyArgs()
                        .WithPolicy(publicReadPolicy)
                        .WithBucket(bucketName);
                    await _minioClient.SetPolicyAsync(policyArgs);
                }
            }

            foreach (var file in files)
            {
                using var stream = new MemoryStream();

                await file.CopyToAsync(stream);

                stream.Position = 0;

                var fileCloudId = Guid.NewGuid();
                var objectName = fileCloudId.ToString("N") + "." + file.FileName.Split(".").Last();

                var putObjectArgs = new PutObjectArgs()
                    .WithBucket(bucketName)
                    .WithObject(objectName)
                    .WithStreamData(stream)
                    .WithObjectSize(stream.Length)
                    .WithContentType(file.ContentType);

                await _minioClient.PutObjectAsync(putObjectArgs);

                var statObject =
                    await _minioClient.StatObjectAsync(
                        new StatObjectArgs()
                            .WithBucket(bucketName)
                            .WithObject(objectName));

                if (!string.IsNullOrEmpty(statObject.ObjectName))
                {

                    fileResponse.Add(new FileCloudResponse()
                    {
                        FileCloudId = fileCloudId.ToString(),
                        FolderName = bucketName,
                        OriginalFileName = file.FileName,
                        FileName = statObject.ObjectName,
                        FileSize = statObject.Size,
                        ContentType = statObject.ContentType,
                        PublicURL = isPublicBucket ? $"{_endPoint}/{bucketName}/{statObject.ObjectName}" : string.Empty
                    });
                }
            }

            return fileResponse;
        }
        catch (MinioException e)
        {
            throw new InfrastructureException(e.Message);
        }
    }

    public async Task<Stream> DownloadFileAsync(string bucketName, string objectName)
    {
        try
        {
            var memoryStream = new MemoryStream();

            var arg = new StatObjectArgs()
                .WithBucket(bucketName)
                .WithObject(objectName);

            var statObject = await _minioClient.StatObjectAsync(arg);
            if (!string.IsNullOrEmpty(statObject.ObjectName))
            {
                var getObjectArgs = new GetObjectArgs()
                    .WithBucket(bucketName)
                    .WithObject(objectName)
                    .WithCallbackStream((stream) => { stream.CopyTo(memoryStream); });

                await _minioClient.GetObjectAsync(getObjectArgs);
            }

            memoryStream.Position = 0;

            return memoryStream;
        }
        catch (MinioException e)
        {
            throw new InfrastructureException(e.Message);
        }
    }

    public async Task<string> GetShareLinkAsync(string bucketName, string objectName, int expireTime)
    {
        try
        {
            var args = new PresignedGetObjectArgs()
                                  .WithBucket(bucketName)
                                  .WithObject(objectName)
                                  .WithExpiry(expireTime * 60);

            return await _minioClient.PresignedGetObjectAsync(args);
        }
        catch (Exception e)
        {
            throw new InfrastructureException(e.Message);
        }
    }

    #endregion

}
