#region using

using System.Text.Json;
using Catalog.Application.Services;
using Minio;
using Minio.DataModel.Args;
using Minio.Exceptions;

#endregion

namespace Catalog.Infrastructure.Services;

public sealed class MinIOCloudService : IMinIOCloudService
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

    #region Implementations

    public async Task<List<UploadFileResult>> UploadFilesAsync(
        List<UploadFileBytes> files,
        string bucketName,
        bool isPublicBucket = false,
        CancellationToken ct = default)
    {
        var results = new List<UploadFileResult>();
        if (files == null || files.Count == 0) return results;

        try
        {
            await EnsureBucketAsync(bucketName, isPublicBucket, ct);

            foreach (var f in files)
            {
                var fileCloudId = Guid.NewGuid();
                var ext = Path.GetExtension(f.FileName);
                var objectName = $"{fileCloudId:N}{ext}";

                using var stream = new MemoryStream(f.Bytes, 0, f.Bytes.Length, writable: false, publiclyVisible: true);

                var putArgs = new PutObjectArgs()
                    .WithBucket(bucketName)
                    .WithObject(objectName)
                    .WithStreamData(stream)
                    .WithObjectSize(stream.Length)
                    .WithContentType(f.ContentType);

                var putResp = await _minioClient.PutObjectAsync(putArgs, ct);

                results.Add(new UploadFileResult
                {
                    FileId = fileCloudId.ToString(),
                    FolderName = bucketName,
                    OriginalFileName = f.FileName,
                    FileName = objectName,
                    FileSize = f.Bytes.LongLength,
                    ContentType = f.ContentType,
                    PublicURL = isPublicBucket ? $"{_endPoint}/{bucketName}/{objectName}" : string.Empty,
                });
            }

            return results;
        }
        catch (MinioException e)
        {
            throw new InfrastructureException(e.Message);
        }
    }

    public async Task<string> GetShareLinkAsync(string bucketName, string objectName, int expireTimeMinutes)
    {
        try
        {
            var args = new PresignedGetObjectArgs()
                .WithBucket(bucketName)
                .WithObject(objectName)
                .WithExpiry(expireTimeMinutes * 60);

            return await _minioClient.PresignedGetObjectAsync(args);
        }
        catch (Exception e)
        {
            throw new InfrastructureException(e.Message);
        }
    }

    #endregion

    #region Helpers

    private async Task EnsureBucketAsync(string bucketName, bool isPublicBucket, CancellationToken ct)
    {
        var exists = await _minioClient
            .BucketExistsAsync(new BucketExistsArgs().WithBucket(bucketName), ct);

        if (!exists)
        {
            await _minioClient.MakeBucketAsync(new MakeBucketArgs().WithBucket(bucketName), ct);

            if (isPublicBucket)
            {
                // Set read-only bucket policy
                var policy = new
                {
                    Version = "2012-10-17",
                    Statement = new[]
                    {
                        new
                        {
                            Effect = "Allow",
                            Principal = "*",
                            Action = new[] { "s3:GetObject" },
                            Resource = $"arn:aws:s3:::{bucketName}/*"
                        }
                    }
                };

                var policyJson = JsonSerializer.Serialize(policy);
                await _minioClient.SetPolicyAsync(
                    new SetPolicyArgs().WithBucket(bucketName).WithPolicy(policyJson), ct
                );
            }
        }
    }

    #endregion
}
