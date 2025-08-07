#region using

using SourceCommon.Constants;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Serilog;
using Serilog.Sinks.Grafana.Loki;
using SourceCommon.Configurations;

#endregion

namespace BuildingBlocks.LogServer;

public static class LogServerExtensions
{
    #region Methods

    public static IServiceCollection AddLogServer(this IServiceCollection services, IConfiguration configuration)
    {
        services.Configure<LogServerOptions>(
            configuration.GetSection(LogServerOptions.Section));

        var logSrvOpt = configuration
            .GetSection(LogServerOptions.Section)
            .Get<LogServerOptions>()
            ?? throw new InvalidOperationException("LogServerOptions section is missing or invalid.");

        Log.Logger = new LoggerConfiguration()
            .MinimumLevel.Debug()
            //.Enrich.FromLogContext()
            //.Enrich.WithProperty("service", configuration.GetValue<string>("AppConfig:ServiceName"))
            //.WriteTo.Elasticsearch(new[] { new Uri(configuration["SerilogServer:ServerLog"]!) }, opts =>
            //{
            //    opts.DataStream = new DataStreamName("logs", "pg-shop-logging", "production");
            //    opts.BootstrapMethod = BootstrapMethod.Failure;
            //}, transport =>
            //{
            //    transport.Authentication(new BasicAuthentication(configuration["SerilogServer:UserName"]!, configuration["SerilogServer:Password"]!));
            //})
            //.WriteTo.Seq(configuration["SerilogServer:ServerLog"]!,
            //     apiKey: configuration["SerilogServer:Password"]!,
            //     controlLevelSwitch: new LoggingLevelSwitch())
            .WriteTo.GrafanaLoki(logSrvOpt.Host!,
                labels: [new LokiLabel() { Key = "app", Value = logSrvOpt.ApplicationName! }],
                propertiesAsLabels: ["app"])
            .CreateLogger();

        services.AddSerilog();

        return services;
    }

    public static WebApplication UseSerilogReqLogging(this WebApplication app)
    {
        app.UseSerilogRequestLogging();

        return app;
    }

    #endregion
}
