#region using

using Inventory.Infrastructure;
using Inventory.Worker;

#endregion

var builder = Host.CreateApplicationBuilder(args);

builder.Services.AddInfrastructureServices(builder.Configuration);
builder.Services.AddWorkerServices(builder.Configuration);
builder.Services.AddHostedService<WorkerBackgroundService>();

var host = builder.Build();

host.Run();
