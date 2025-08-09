#region using

using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using OpenTelemetry.Exporter;
using OpenTelemetry.Instrumentation.AspNetCore;
using OpenTelemetry.Metrics;
using OpenTelemetry.Resources;
using OpenTelemetry.Trace;
using SourceCommon.Configurations;
using System.Diagnostics;

#endregion

namespace BuildingBlocks.TracingLogging;

public static class DistributedTracingAndLoggingExtension
{
    #region Methods

    public static IServiceCollection AddDistributedTracingAndLogging(
        this IServiceCollection services, 
        IConfiguration cfg)
    {
        services.Configure<AspNetCoreTraceInstrumentationOptions>(
            cfg.GetSection($"{DistributedTracingLoggingCfg.Section}:{DistributedTracingLoggingCfg.AspNetCoreInstrumentation}"));

        services.Configure<ZipkinExporterOptions>(
            cfg.GetSection($"{DistributedTracingLoggingCfg.Section}:{DistributedTracingLoggingCfg.Zipkin}"));

        var zipkinEndpoint = cfg[$"{DistributedTracingLoggingCfg.Section}:{DistributedTracingLoggingCfg.Zipkin}:{DistributedTracingLoggingCfg.Endpoint}"];
        var otlpEndpoint = cfg[$"{DistributedTracingLoggingCfg.Section}:{DistributedTracingLoggingCfg.Otlp}:{DistributedTracingLoggingCfg.Endpoint}"];

        services.AddOpenTelemetry()
            .ConfigureResource(r => r
                .AddService(
                    serviceName: cfg[$"{AppConfigCfg.Section}:{AppConfigCfg.ServiceName}"]!,
                    serviceNamespace: $"namespace-{cfg[$"{AppConfigCfg.Section}:{AppConfigCfg.ServiceName}"]}",
                    serviceInstanceId: $"{cfg[$"{AppConfigCfg.Section}:{AppConfigCfg.ServiceName}"]}-{Environment.MachineName}-{Process.GetCurrentProcess().Id}")
                .AddAttributes(new Dictionary<string, object>
                {
                    ["deployment.environment"] = cfg["ASPNETCORE_ENVIRONMENT"] ?? "Production",
                    ["host.name"] = Environment.MachineName
                }))
            .WithTracing(tracingBuilder =>
            {
                tracingBuilder
                    .SetSampler(new TraceIdRatioBasedSampler(
                        cfg.GetValue<double>(cfg[$"{DistributedTracingLoggingCfg.Section}:{DistributedTracingLoggingCfg.SamplingRate}"]!)))
                    .AddHttpClientInstrumentation(opts =>
                    {
                        opts.RecordException = true;
                        opts.EnrichWithException = (activity, exception) =>
                        {
                            activity.SetTag("exception.type", exception.GetType().FullName);
                            activity.SetTag("exception.message", exception.Message);
                        };
                    })
                    .AddAspNetCoreInstrumentation(opts =>
                    {
                        opts.RecordException = true;
                        opts.EnrichWithException = (activity, exception) =>
                        {
                            activity.SetTag("exception.type", exception.GetType().FullName);
                            activity.SetTag("exception.message", exception.Message);
                        };
                    })
                    .AddSource(cfg[$"{DistributedTracingLoggingCfg.Section}:{DistributedTracingLoggingCfg.Source}"]!);

                // Configure exporters
                if (!string.IsNullOrEmpty(zipkinEndpoint))
                {
                    tracingBuilder.AddZipkinExporter(opt =>
                    {
                        opt.Endpoint = new Uri(zipkinEndpoint);
                    });
                }

                if (!string.IsNullOrEmpty(otlpEndpoint))
                {
                    tracingBuilder.AddOtlpExporter(opt =>
                    {
                        opt.Endpoint = new Uri(otlpEndpoint);
                    });
                }
            })
            .WithMetrics(metricsBuilder =>
            {
                metricsBuilder
                    .SetExemplarFilter(ExemplarFilterType.TraceBased)
                    .AddRuntimeInstrumentation()
                    .AddHttpClientInstrumentation()
                    .AddAspNetCoreInstrumentation();

                if (cfg.GetValue<bool>(cfg[$"{DistributedTracingLoggingCfg.Section}:{DistributedTracingLoggingCfg.Prometheus}:{DistributedTracingLoggingCfg.Enabled}"]!))
                {
                    metricsBuilder.AddPrometheusExporter();
                }

                if (!string.IsNullOrEmpty(otlpEndpoint))
                {
                    metricsBuilder.AddOtlpExporter(otlpOptions =>
                    {
                        otlpOptions.Endpoint = new Uri(otlpEndpoint);
                    });
                }
            });

        return services;
    }

    public static WebApplication UsePrometheusEndpoint(this WebApplication app)
    {
        var cfg = app.Configuration;

        if (cfg.GetValue<bool>(cfg[$"{DistributedTracingLoggingCfg.Section}:{DistributedTracingLoggingCfg.Prometheus}:{DistributedTracingLoggingCfg.Enabled}"]!))
        {
            app.MapPrometheusScrapingEndpoint();
        }

        return app;
    }

    #endregion
}