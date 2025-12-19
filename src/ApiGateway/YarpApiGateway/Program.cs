#region using

using HealthChecks.UI.Client;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using Microsoft.AspNetCore.RateLimiting;

#endregion

#region Startup

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var policyName = builder.Configuration.GetSection("CorsConfig:PolicyName").Get<string>()!;
builder.Services.AddCors(options =>
{
    options.AddPolicy(policyName,
        b => b
            .WithOrigins(builder.Configuration.GetSection("CorsConfig:Domains").Get<string[]>()!)
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials()); // Required for SignalR to send cookies/tokens
});

builder.Services.AddReverseProxy()
    .LoadFromConfig(builder.Configuration.GetSection("ReverseProxy"));

builder.Services.AddRateLimiter(rateLimiterOptions =>
{
    rateLimiterOptions.AddFixedWindowLimiter("fixed", options =>
    {
        options.Window = TimeSpan.FromSeconds(10);
        options.PermitLimit = 5;
    });
});

builder.Services.AddHealthChecks();

var app = builder.Build();

app.UseCors(policyName);

// Configure the HTTP request pipeline.
app.UseRateLimiter();

app.MapReverseProxy();

app.UseHealthChecks("/health",
    new HealthCheckOptions
    {
        ResponseWriter = UIResponseWriter.WriteHealthCheckUIResponse
    });

app.MapGet("/", (IWebHostEnvironment env) => new
{
    Service = "API Gateway",
    Status = "Running",
    Timestamp = DateTimeOffset.UtcNow,
    Environment = env.EnvironmentName,
    Endpoints = new Dictionary<string, string>
            {
                { "health", "/health" }
            },
    Message = "API Gateway is running..."
});

app.Run();

#endregion
