namespace SourceCommon.Configurations;

public sealed class DistributedTracingLoggingCfg
{
    #region Constants

    public const string Section = "DistributedTracingAndLogging";

    public const string Source = "Source";

    public const string SamplingRate = "SamplingRate";

    public const string Zipkin = "Zipkin";

    public const string Otlp = "Otlp";

    public const string Prometheus = $"Prometheus";

    public const string AspNetCoreInstrumentation = "AspNetCoreInstrumentation";

    public const string Endpoint = "Endpoint";

    public const string Enabled = "Enabled";

    public const string RecordException = "RecordException";

    public const string Enable = "Enable";

    #endregion

}