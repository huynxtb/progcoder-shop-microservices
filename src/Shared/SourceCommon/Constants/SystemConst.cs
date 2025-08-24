namespace SourceCommon.Constants;

public sealed class SystemConst
{
    #region Constants

    public const string CreatedBySystem = "system";

    public const string CreatedByKeycloak = "keycloak";

    public const string CreatedByIntegrationJob = "integration_job";

    public const string CreatedByWorker = "worker";

    public const string NA = "N/A";

    public const int MaxAttempts = 5;

    public const int MinRetries = 5;

    #endregion
}
