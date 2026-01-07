#region using

using Communication.Api;

#endregion

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services
    .AddApiServices(builder.Configuration);

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseApi();

app.MapGet("/", (IWebHostEnvironment env) => new ApiDefaultPathResponse
{
    Service = "Communication.Api",
    Status = "Running",
    Timestamp = DateTimeOffset.UtcNow,
    Environment = env.EnvironmentName,
    Endpoints = new Dictionary<string, string>
    {
        { "health", "/health" }
    },
    Message = "API is running..."
});

app.Run();
