#region using

using BuildingBlocks.DistributedTracing;
using BuildingBlocks.Logging;
using Discount.Application;
using Discount.Grpc.Services;
using Discount.Infrastructure;

#endregion

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services
    .AddApplicationServices()
    .AddInfrastructureServices(builder.Configuration);

var app = builder.Build();

app.UseSerilogReqLogging();
app.UsePrometheusEndpoint();

app.MapGrpcService<DiscountGrpcService>();

app.Run();
