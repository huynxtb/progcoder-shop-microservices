using System.Diagnostics;

namespace BuildingBlocks.Logging;

public sealed class ActivityTraceEnricher : Serilog.Core.ILogEventEnricher
{
    public void Enrich(Serilog.Events.LogEvent logEvent, Serilog.Core.ILogEventPropertyFactory pf)
    {
        var act = Activity.Current;
        if (act is null) return;

        logEvent.AddPropertyIfAbsent(pf.CreateProperty("trace_id", act.TraceId.ToString()));
        logEvent.AddPropertyIfAbsent(pf.CreateProperty("span_id", act.SpanId.ToString()));
    }
}
