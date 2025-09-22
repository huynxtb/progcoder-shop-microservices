#region using

using Order.Worker.Consumer.BackgroundServices;

#endregion

var builder = Host.CreateApplicationBuilder(args);
builder.Services.AddHostedService<OrderBackgroudService>();

var host = builder.Build();
host.Run();
