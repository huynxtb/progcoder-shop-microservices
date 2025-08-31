#region using

using Notification.Infrastructure;
using Notification.Worker;

#endregion

var builder = Host.CreateApplicationBuilder(args);

builder.Services.AddInfrastructureServices(builder.Configuration);
builder.Services.AddWorkerServices(builder.Configuration);
builder.Services.AddHostedService<Worker>();

var host = builder.Build();

host.Run();
