#region using

using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using OpenTelemetry.Exporter;
using OpenTelemetry.Logs;
using OpenTelemetry.Metrics;
using OpenTelemetry.Resources;
using OpenTelemetry.Trace;
using Common.Configurations;
using System.Diagnostics;

#endregion

namespace BuildingBlocks.DistributedTracing;

public static class DistributedTracingExtension
{
    #region Methods

    public static IServiceCollection AddDistributedTracing(
        this IServiceCollection services,
        IConfiguration cfg)
    {
        var enable = cfg.GetValue($"{DistributedTracingCfg.Section}:{DistributedTracingCfg.Enable}", false);
        if (!enable) return services;

        var otlpEndpoint = cfg[$"{DistributedTracingCfg.Section}:{DistributedTracingCfg.Otlp}:{DistributedTracingCfg.Endpoint}"];

        services.AddOpenTelemetry()
            .ConfigureResource(r => r
                .AddService(
                    serviceName: cfg[$"{DistributedTracingCfg.Section}:{DistributedTracingCfg.ServiceName}"]!,
                    serviceNamespace: $"namespace-{cfg[$"{DistributedTracingCfg.Section}:{DistributedTracingCfg.ServiceName}"]}",
                    serviceInstanceId: $"{cfg[$"{DistributedTracingCfg.Section}:{DistributedTracingCfg.ServiceName}"]}-{Environment.MachineName}-{Process.GetCurrentProcess().Id}")
                .AddEnvironmentVariableDetector()
                .AddAttributes(new Dictionary<string, object>
                {
                    ["deployment.environment"] = cfg["ASPNETCORE_ENVIRONMENT"] ?? "Production",
                    ["host.name"] = Environment.MachineName
                }))
            .WithTracing(tracingBuilder =>
            {
                tracingBuilder
                    .SetSampler(new TraceIdRatioBasedSampler(
                        cfg.GetValue<double>($"{DistributedTracingCfg.Section}:{DistributedTracingCfg.SamplingRate}")))
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
                        opts.Filter = ctx =>
                        {
                            var p = ctx.Request.Path.Value ?? "";
                            if (p.StartsWith("/health")) return false;
                            if (p.StartsWith("/metrics")) return false;
                            if (p.StartsWith("/favicon")) return false;
                            return true;
                        };
                    })
                    .AddHttpClientInstrumentation(o => o.RecordException = true)
                    .AddSource(cfg[$"{DistributedTracingCfg.Section}:{DistributedTracingCfg.Source}"]!);

                tracingBuilder.AddOtlpExporter(opt =>
                {
                    opt.Endpoint = new Uri(otlpEndpoint!);
                    opt.Protocol = OtlpExportProtocol.Grpc;
                    opt.TimeoutMilliseconds = cfg.GetValue($"{DistributedTracingCfg.Section}:{DistributedTracingCfg.Otlp}:{DistributedTracingCfg.TimeoutMs}", 10000);
                });
            })
            .WithMetrics(metricsBuilder =>
            {
                metricsBuilder
                    .AddRuntimeInstrumentation()
                    //.AddProcessInstrumentation()
                    .AddAspNetCoreInstrumentation()
                    .AddHttpClientInstrumentation()
                    .AddView("http.server.duration", new ExplicitBucketHistogramConfiguration
                    {
                        Boundaries = new double[] { 1, 2, 5, 10, 25, 50, 100, 250, 500, 1000, 2500, 5000, 10000 }
                    })
                    .AddView("http.client.duration", new ExplicitBucketHistogramConfiguration
                    {
                        Boundaries = new double[] { 1, 5, 10, 20, 50, 100, 250, 500, 1000, 2500, 5000 }
                    })
                    .AddOtlpExporter(o =>
                    {
                        o.Protocol = OtlpExportProtocol.Grpc;
                        o.Endpoint = new Uri(otlpEndpoint!);
                    });

                if (cfg.GetValue($"{DistributedTracingCfg.Section}:{DistributedTracingCfg.Prometheus}:{DistributedTracingCfg.Enable}", false))
                {
                    metricsBuilder.AddPrometheusExporter();
                }
            });

        return services;
    }

    public static WebApplication UsePrometheusEndpoint(this WebApplication app)
    {
        var cfg = app.Configuration;
        var enable = cfg.GetValue($"{DistributedTracingCfg.Section}:{DistributedTracingCfg.Enable}", false);

        if (!enable) return app;

        var enablePrometheus = cfg.GetValue($"{DistributedTracingCfg.Section}:{DistributedTracingCfg.Prometheus}:{DistributedTracingCfg.Enable}", false);

        if (enablePrometheus)
        {
            app.MapPrometheusScrapingEndpoint();
        }

        return app;
    }

    #endregion
}