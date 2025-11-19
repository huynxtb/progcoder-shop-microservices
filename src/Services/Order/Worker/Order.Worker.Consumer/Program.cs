#region using

using Order.Application;
using Order.Infrastructure;
using Order.Worker.Consumer;
using Order.Worker.Consumer.BackgroundServices;

#endregion

var builder = Host.CreateApplicationBuilder(args);

builder.Services
    .AddApplicationServices()
    .AddInfrastructureServices(builder.Configuration)
    .AddWorkerServices(builder.Configuration)
    .AddHostedService<OrderBackgroudService>();

var host = builder.Build();
host.Run();
