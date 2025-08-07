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
using SourceCommon.Constants;
using System.Configuration;
using System.Diagnostics;

#endregion

namespace BuildingBlocks.TracingLogging;

public static class DistributedTracingAndLoggingExtension
{
    #region Methods

    public static IServiceCollection AddDistributedTracingAndLogging(this IServiceCollection services, IConfiguration configuration)
    {
        services.Configure<DistributedTracingLoggingOptions>(
            configuration.GetSection(DistributedTracingLoggingOptions.Section));

        var traceOpt = configuration
            .GetSection(DistributedTracingLoggingOptions.Section)
            .Get<DistributedTracingLoggingOptions>()
            ?? throw new InvalidOperationException("DistributedTracingLoggingOptions section is missing or invalid.");

        var otlpEndpoint = traceOpt.Otlp!.Endpoint;
        var zipkinEndpoint = traceOpt.Zipkin!.Endpoint;

        services.Configure<AspNetCoreTraceInstrumentationOptions>(
            configuration.GetSection($"{DistributedTracingLoggingOptions.Section}:AspNetCoreInstrumentation"));
        services.Configure<ZipkinExporterOptions>(
            configuration.GetSection($"{DistributedTracingLoggingOptions.Section}:Zipkin"));

        services.AddOpenTelemetry()
            .ConfigureResource(r => r
                .AddService(
                    serviceName: traceOpt.ApplicationName!,
                    serviceNamespace: $"namespace-{traceOpt.ApplicationName}",
                    serviceInstanceId: $"{traceOpt.ApplicationName}-{Environment.MachineName}-{Process.GetCurrentProcess().Id}")
                .AddAttributes(new Dictionary<string, object>
                {
                    ["deployment.environment"] = configuration["ASPNETCORE_ENVIRONMENT"] ?? "Production",
                    ["host.name"] = Environment.MachineName
                }))
            .WithTracing(tracingBuilder =>
            {
                tracingBuilder
                    .SetSampler(new TraceIdRatioBasedSampler(traceOpt.SamplingRate))
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
                    .AddSource(traceOpt.Source!);

                // Configure exporters
                if (!string.IsNullOrEmpty(zipkinEndpoint))
                {
                    tracingBuilder.AddZipkinExporter();
                }

                if (!string.IsNullOrEmpty(otlpEndpoint))
                {
                    tracingBuilder.AddOtlpExporter(otlpOptions =>
                    {
                        otlpOptions.Endpoint = new Uri(otlpEndpoint);
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

                if (traceOpt.Prometheus!.Enabled)
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
        var traceOpt = app.Configuration
            .GetSection(DistributedTracingLoggingOptions.Section)
            .Get<DistributedTracingLoggingOptions>()
            ?? throw new InvalidOperationException("DistributedTracingLoggingOptions section is missing or invalid.");

        if (traceOpt.Prometheus!.Enabled)
        {
            app.MapPrometheusScrapingEndpoint();
        }

        return app;
    }

    #endregion
}