namespace SourceCommon.Configurations;

public class AppConfigOptions
{
    #region Constants

    public const string Section = "AppConfig";

    #endregion

    #region Fields, Properties and Indexers

    public string? ServiceName { get; set; }

    public string? ApiKey { get; set; }

    #endregion
}
