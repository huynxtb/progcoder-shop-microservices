#region using

using BuildingBlocks.DistributedTracing;
using BuildingBlocks.Logging;
using Report.Application;
using Report.Grpc;
using Report.Infrastructure;

#endregion

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services
    .AddApplicationServices()
    .AddInfrastructureServices(builder.Configuration)
    .AddGrpcServices(builder.Configuration);

var app = builder.Build();

app.UseSerilogReqLogging();
app.UsePrometheusEndpoint();

app.MapGrpcService<Report.Grpc.Services.ReportGrpcService>();
app.MapGet("/", () => "Report gRPC is running...");

app.Run();

