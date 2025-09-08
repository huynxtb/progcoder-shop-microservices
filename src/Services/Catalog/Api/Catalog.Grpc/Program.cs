#region using

using BuildingBlocks.DistributedTracing;
using BuildingBlocks.Logging;
using Catalog.Application;
using Catalog.Grpc;
using Catalog.Grpc.Services;
using Catalog.Infrastructure;

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

app.MapGrpcService<CatalogGrpcService>();

app.Run();
