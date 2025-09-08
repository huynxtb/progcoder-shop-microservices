#region using

using Inventory.Application;
using Inventory.Infrastructure;
using Inventory.Worker.Outbox;
using Inventory.Worker.Outbox.BackgroundServices;

#endregion

var builder = Host.CreateApplicationBuilder(args);

builder.Services
    .AddApplicationServices()
    .AddInfrastructureServices(builder.Configuration)
    .AddWorkerServices(builder.Configuration)
    .AddHostedService<OutboxBackgroundService>();

var host = builder.Build();

host.Run();
