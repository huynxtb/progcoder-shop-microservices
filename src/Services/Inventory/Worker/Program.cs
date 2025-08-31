#region using

using Inventory.Infrastructure;
using Inventory.Worker;
using Inventory.Worker.Outbox;

#endregion

var builder = Host.CreateApplicationBuilder(args);

builder.Services.AddInfrastructureServices(builder.Configuration);
builder.Services.AddWorkerServices(builder.Configuration);
builder.Services.AddHostedService<OutboxBackgroundService>();

var host = builder.Build();

host.Run();
