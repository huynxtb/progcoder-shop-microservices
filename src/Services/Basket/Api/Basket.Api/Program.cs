#region using

using Basket.Api;
using Basket.Application;
using Basket.Infrastructure;

#endregion

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services
    .AddApplicationServices()
    .AddInfrastructureServices(builder.Configuration)
    .AddApiServices(builder.Configuration);

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseApi();
app.UseInfrastructure();

app.Run();
