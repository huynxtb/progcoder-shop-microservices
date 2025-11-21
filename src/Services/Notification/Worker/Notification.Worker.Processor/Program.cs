#region using

using Notification.Application;
using Notification.Infrastructure;
using Notification.Worker.Processor;

#endregion

var builder = Host.CreateApplicationBuilder(args);

builder.Services
    .AddApplicationServices()
    .AddInfrastructureServices(builder.Configuration)
    .AddWorkerServices(builder.Configuration)
    .AddHostedService<Worker>();

var host = builder.Build();
host.Run();
