namespace SourceCommon.Configurations;

public class DistributedTracingLoggingOptions
{
    #region Constants

    public const string Section = "DistributedTracingAndLogging";

    #endregion

    #region Fields, Properties and Indexers

    public string? ApplicationName { get; set; }

    public string? Source { get; set; }

    public double SamplingRate { get; set; } = 1.0;

    public ZipkinOptions? Zipkin { get; set; }

    public OtlpOptions? Otlp { get; set; }

    public PrometheusOptions? Prometheus { get; set; }

    public AspNetCoreInstrumentationOptions? AspNetCoreInstrumentation { get; set; }

    #endregion
}

public class ZipkinOptions
{

    #region Fields, Properties and Indexers

    public string? Endpoint { get; set; }

    #endregion
}

public class OtlpOptions
{

    #region Fields, Properties and Indexers

    public string? Endpoint { get; set; }

    #endregion
}

public class PrometheusOptions
{

    #region Fields, Properties and Indexers

    public string? Endpoint { get; set; }

    public bool Enabled { get; set; }

    #endregion
}

public class AspNetCoreInstrumentationOptions
{

    #region Fields, Properties and Indexers

    public bool RecordException { get; set; }

    #endregion
}