#region using

using Search.Application;
using Search.Infrastructure;
using Search.Worker.Consumer;
using Search.Worker.Consumer.BackgroundServices;

#endregion

var builder = Host.CreateApplicationBuilder(args);

builder.Services
    .AddApplicationServices()
    .AddInfrastructureServices(builder.Configuration)
    .AddWorkerServices(builder.Configuration)
    .AddHostedService<SearchBackgroudService>();

var host = builder.Build();
host.Run();
