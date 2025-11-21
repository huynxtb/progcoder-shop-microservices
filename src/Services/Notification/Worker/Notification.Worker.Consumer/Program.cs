#region using

using Notification.Application;
using Notification.Infrastructure;
using Notification.Worker.Consumer;
using Notification.Worker.Consumer.BackgroundServices;

#endregion

var builder = Host.CreateApplicationBuilder(args);

builder.Services
    .AddApplicationServices()
    .AddInfrastructureServices(builder.Configuration)
    .AddWorkerServices(builder.Configuration)
    .AddHostedService<NotificationBackgroundService>();

var host = builder.Build();
host.Run();
