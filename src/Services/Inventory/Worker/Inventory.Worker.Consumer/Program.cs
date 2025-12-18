#region using

using Inventory.Application;
using Inventory.Infrastructure;
using Inventory.Worker.Consumer;
using Inventory.Worker.Consumer.BackgroundServices;

#endregion

var builder = Host.CreateApplicationBuilder(args);

builder.Services
    .AddApplicationServices()
    .AddInfrastructureServices(builder.Configuration)
    .AddWorkerServices(builder.Configuration)
    .AddHostedService<InventoryBackgroudService>();

var host = builder.Build();
host.Run();
