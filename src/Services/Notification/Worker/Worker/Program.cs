using Notification.Infrastructure;
using Notification.Worker;

var builder = Host.CreateApplicationBuilder(args);

builder.Services.AddHostedService<Worker>();
builder.Services.AddWorkerServices(builder.Configuration);
builder.Services.AddInfrastructureServices(builder.Configuration);

var host = builder.Build();

host.Run();
