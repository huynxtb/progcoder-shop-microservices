#region using

using BuildingBlocks.DistributedTracing;
using BuildingBlocks.Logging;
using Discount.Application;
using Discount.Grpc;
using Discount.Grpc.Services;
using Discount.Infrastructure;

#endregion

var builder = WebApplication.CreateBuilder(args);
var cfg = builder.Configuration;

// Add services to the container.
builder.Services
    .AddApplicationServices()
    .AddInfrastructureServices(cfg)
    .AddGrpcServices(cfg);

var app = builder.Build();

app.UseSerilogReqLogging();
app.UsePrometheusEndpoint();

app.MapGrpcService<DiscountGrpcService>();
app.MapGet("/", () => "Discount gRPC is running...");

app.Run();
