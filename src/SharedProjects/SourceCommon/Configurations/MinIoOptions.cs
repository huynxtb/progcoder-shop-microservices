namespace SourceCommon.Configurations;

public class MinIoOptions
{
    #region Constants

    public const string Section = "MinIO";

    #endregion

    #region Fields, Properties and Indexers

    public string? Endpoint { get; set; }

    public string? AccessKey { get; set; }

    public string? SecretKey { get; set; }

    public bool Secure { get; set; } = false;

    #endregion
}
