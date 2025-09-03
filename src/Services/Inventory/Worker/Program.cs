#region using

using Inventory.Application;
using Inventory.Infrastructure;
using Inventory.Worker;
using Inventory.Worker.BackgroundServices;


#endregion

var builder = Host.CreateApplicationBuilder(args);

builder.Services
    .AddApplicationServices()
    .AddInfrastructureServices(builder.Configuration)
    .AddWorkerServices(builder.Configuration)
    .AddHostedService<OutboxBackgroundService>();

var host = builder.Build();

host.Run();
