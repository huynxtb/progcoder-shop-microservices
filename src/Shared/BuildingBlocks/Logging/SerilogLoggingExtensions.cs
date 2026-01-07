#region using

using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Serilog;
using Serilog.Core;
using Serilog.Events;
using Serilog.Formatting.Compact;
using Serilog.Sinks.OpenTelemetry;
using Common.Configurations;

#endregion

namespace BuildingBlocks.Logging;

public static class SerilogLoggingExtensions
{
    #region Methods

    public static IServiceCollection AddSerilogLogging(
        this IServiceCollection services,
        IConfiguration cfg)
    {
        var section = SerilogCfg.Section;
        var enable = cfg.GetValue($"{section}:{SerilogCfg.Enable}", false);
        if (!enable) return services;

        var serviceName = cfg[$"{section}:{SerilogCfg.ServiceName}"] ?? "unknown-service";
        var env = cfg["ASPNETCORE_ENVIRONMENT"] ?? "Production";
        var lvlDefault = ParseLevel(cfg[$"{section}:{SerilogCfg.MinimumLevel}:{SerilogCfg.Default}"] ?? "Information");
        var lvlMicrosoft = ParseLevel(cfg[$"{section}:{SerilogCfg.MinimumLevel}:{SerilogCfg.Override}:{SerilogCfg.Microsoft}"] ?? "Warning");
        var lvlSystem = ParseLevel(cfg[$"{section}:{SerilogCfg.MinimumLevel}:{SerilogCfg.Override}:{SerilogCfg.System}"] ?? "Warning");
        var consoleEnable = cfg.GetValue($"{section}:{SerilogCfg.Console}:{SerilogCfg.Enable}", true);
        var consoleLevel = ParseLevel(cfg[$"{section}:{SerilogCfg.Console}:{SerilogCfg.Level}"] ?? "Information");
        var otlpEndpoint = cfg[$"{section}:{SerilogCfg.Otlp}:{SerilogCfg.Endpoint}"];
        var levelSwitch = new LoggingLevelSwitch(lvlDefault);
        var loggerCfg = new LoggerConfiguration()
            .MinimumLevel.ControlledBy(levelSwitch)
            .MinimumLevel.Override("Microsoft", lvlMicrosoft)
            .MinimumLevel.Override("System", lvlSystem)
            .Enrich.FromLogContext()
            .Enrich.WithProperty("service.name", serviceName)
            .Enrich.WithProperty("deployment.environment", env)
            .Enrich.With<ActivityTraceEnricher>();

        if (consoleEnable)
        {
            loggerCfg = loggerCfg.WriteTo.Console(
                new CompactJsonFormatter(),
                restrictedToMinimumLevel: consoleLevel);
        }

        loggerCfg = loggerCfg.WriteTo.OpenTelemetry(o =>
        {
            o.Endpoint = otlpEndpoint;
            o.Protocol = OtlpProtocol.Grpc;
            o.ResourceAttributes = new Dictionary<string, object>
            {
                ["service.name"] = serviceName,
                ["deployment.environment"] = env
            };
        });

        Log.Logger = loggerCfg.CreateLogger();

        services.AddSerilog(logger: Log.Logger, dispose: true);

        if (cfg.GetValue($"{section}:EnableSelfLog", false))
        {
            Serilog.Debugging.SelfLog.Enable(msg => Console.Error.WriteLine(msg));
        }

        return services;
    }

    public static WebApplication UseSerilogReqLogging(this WebApplication app)
    {
        var section = SerilogCfg.Section;
        var enable = app.Configuration.GetValue($"{section}:{SerilogCfg.Enable}", false);
        if (!enable) return app;

        app.UseSerilogRequestLogging(options =>
        {
            options.GetLevel = (httpCtx, elapsed, ex) =>
            {
                var path = httpCtx.Request.Path.Value ?? "";
                if (path.StartsWith("/health", StringComparison.OrdinalIgnoreCase)) return LogEventLevel.Debug;
                if (path.StartsWith("/metrics", StringComparison.OrdinalIgnoreCase)) return LogEventLevel.Debug;
                if (path.StartsWith("/swagger", StringComparison.OrdinalIgnoreCase)) return LogEventLevel.Debug;
                if (ex != null || httpCtx.Response.StatusCode >= 500) return LogEventLevel.Error;

                return LogEventLevel.Information;
            };
            options.EnrichDiagnosticContext = (diag, ctx) =>
            {
                diag.Set("RequestHost", ctx.Request.Host.ToString());
                diag.Set("UserAgent", ctx.Request.Headers.UserAgent.ToString());
                diag.Set("ClientIP", ctx.Connection.RemoteIpAddress?.ToString());
                diag.Set("Route", ctx.GetEndpoint()?.DisplayName);
            };
            options.MessageTemplate = "HTTP {RequestMethod} {RequestPath} -> {StatusCode} in {Elapsed:0.0000} ms";
            options.IncludeQueryInRequestPath = false;
        });

        app.Lifetime.ApplicationStopped.Register(Log.CloseAndFlush);

        return app;
    }

    private static LogEventLevel ParseLevel(string s) =>
        Enum.TryParse<LogEventLevel>(s, true, out var lvl) ? lvl : LogEventLevel.Information;

    #endregion
}
