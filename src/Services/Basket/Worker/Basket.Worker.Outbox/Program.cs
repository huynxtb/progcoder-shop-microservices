#region using

using Basket.Application;
using Basket.Infrastructure;
using Basket.Worker.Outbox;
using Basket.Worker.Outbox.BackgroundServices;

#endregion

var builder = Host.CreateApplicationBuilder(args);

builder.Services
    .AddApplicationServices()
    .AddInfrastructureServices(builder.Configuration)
    .AddWorkerServices(builder.Configuration)
    .AddHostedService<OutboxBackgroundService>();

var host = builder.Build();

host.Run();
