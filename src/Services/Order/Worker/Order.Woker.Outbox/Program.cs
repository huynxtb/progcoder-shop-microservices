#region using

using Order.Application;
using Order.Infrastructure;
using Order.Worker;
using Order.Worker.BackgroundServices;


#endregion

var builder = Host.CreateApplicationBuilder(args);

builder.Services
    .AddApplicationServices()
    .AddInfrastructureServices(builder.Configuration)
    .AddWorkerServices(builder.Configuration)
    .AddHostedService<OutboxBackgroundService>();

var host = builder.Build();

host.Run();
