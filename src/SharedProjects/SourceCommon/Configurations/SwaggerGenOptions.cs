namespace SourceCommon.Configurations;

public class SwaggerGenOptions
{
    #region Constants

    public const string Section = "SwaggerGen";

    #endregion

    #region Fields, Properties and Indexers

    public bool Enable { get; set; }

    public string? Contact { get; set; }

    public string? Name { get; set; }

    public string? Url { get; set; }

    public string? OAuth2RedirectUrl { get; set; }

    public bool IncludeInnerException { get; set; }

    public bool IncludeExceptionStackTrace { get; set; }

    #endregion
}
