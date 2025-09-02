namespace Common.Configurations;

public sealed class DistributedTracingCfg
{
    #region Constants

    public const string Section = "DistributedTracing";

    public const string Source = "Source";

    public const string SamplingRate = "SamplingRate";

    public const string Zipkin = "Zipkin";

    public const string Otlp = "Otlp";

    public const string Prometheus = "Prometheus";

    public const string Endpoint = "Endpoint";

    public const string ServiceName = "ServiceName";

    public const string Enable = "Enable";

    public const string TimeoutMs = "TimeoutMs";

    #endregion

}