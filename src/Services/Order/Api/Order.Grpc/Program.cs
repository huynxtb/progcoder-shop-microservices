#region using

using BuildingBlocks.DistributedTracing;
using BuildingBlocks.Logging;
using Order.Application;
using Order.Grpc;
using Order.Grpc.Services;
using Order.Infrastructure;

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

app.MapGrpcService<OrderGrpcService>();

app.Run();
