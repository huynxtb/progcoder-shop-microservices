#region using

using Catalog.Application;
using Catalog.Infrastructure;
using Catalog.Worker.Outbox;
using Catalog.Worker.Outbox.BackgroundServices;

#endregion

var builder = Host.CreateApplicationBuilder(args);

builder.Services
    .AddApplicationServices()
    .AddInfrastructureServices(builder.Configuration)
    .AddWorkerServices(builder.Configuration)
    .AddHostedService<OutboxBackgroundService>();

var host = builder.Build();

host.Run();
