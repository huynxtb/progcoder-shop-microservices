using Catalog.Worker;

var builder = Host.CreateApplicationBuilder(args);
builder.Services.AddHostedService<CatalogBackgroudService>();

var host = builder.Build();
host.Run();
