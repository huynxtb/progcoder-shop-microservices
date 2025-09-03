#region using

using Catalog.Application;
using Catalog.Infrastructure;
using Catalog.Worker;
using Catalog.Worker.BackgroundServices;

#endregion

var builder = Host.CreateApplicationBuilder(args);

builder.Services
    .AddApplicationServices()
    .AddInfrastructureServices(builder.Configuration)
    .AddWorkerServices(builder.Configuration)
    .AddHostedService<CatalogBackgroudService>();

var host = builder.Build();
host.Run();
