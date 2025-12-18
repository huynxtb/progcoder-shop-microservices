#region using

using BuildingBlocks.DistributedTracing;
using BuildingBlocks.Logging;
using Inventory.Application;
using Inventory.Grpc;
using Inventory.Infrastructure;
using Inventory.Grpc.Services;

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

app.MapGrpcService<InventoryGrpcService>();
app.MapGet("/", () => "Catalog gRPC is running...");

app.Run();
