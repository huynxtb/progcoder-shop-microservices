#region using

using Common.Configurations;
using Elasticsearch.Net;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Nest;
using Search.Infrastructure.Data;

#endregion

namespace Search.Infrastructure;

public static class DependencyInjection
{
    #region Methods

    public static IServiceCollection AddInfrastructureServices(
        this IServiceCollection services,
        IConfiguration cfg)
    {
        services.Scan(s => s
            .FromAssemblyOf<InfrastructureMarker>()
            .AddClasses(c => c.Where(t => t.Name.EndsWith("Service")))
            .UsingRegistrationStrategy(Scrutor.RegistrationStrategy.Skip)
            .AsImplementedInterfaces()
            .WithScopedLifetime());

        services.Scan(s => s
            .FromAssemblyOf<InfrastructureMarker>()
            .AddClasses(c => c.Where(t => t.Name.EndsWith("Repository")))
            .UsingRegistrationStrategy(Scrutor.RegistrationStrategy.Skip)
            .AsImplementedInterfaces()
            .WithSingletonLifetime());


        var uri = cfg[$"{ElasticSearchCfg.Section}:{ElasticSearchCfg.Uri}"];
        var username = cfg[$"{ElasticSearchCfg.Section}:{ElasticSearchCfg.Username}"];
        var password = cfg[$"{ElasticSearchCfg.Section}:{ElasticSearchCfg.Password}"];

        Uri[] nodes = [new(uri!)];
        StaticConnectionPool connectionPool = new(nodes);
        ConnectionSettings? connectionSettings = new ConnectionSettings(connectionPool)
            .DisableDirectStreaming()
            .BasicAuthentication(username, password);
        connectionSettings.PrettyJson();
        ElasticClient elasticClient = new(connectionSettings);

        services.AddSingleton<IElasticClient>(elasticClient);
        services.AddTransient<ElasticSearchInitializer>();

        return services;
    }

    public static WebApplication UseInfrastructure(this WebApplication app)
    {
        // Initialize Elasticsearch indices on startup
        using var scope = app.Services.CreateScope();
        var initializer = scope.ServiceProvider.GetRequiredService<ElasticSearchInitializer>();
        var logger = scope.ServiceProvider.GetRequiredService<ILogger<ElasticSearchInitializer>>();

        try
        {
            logger.LogInformation("Initializing Elasticsearch indices...");
            initializer.InitializeAsync().GetAwaiter().GetResult();
            logger.LogInformation("Elasticsearch indices initialized successfully");
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error initializing Elasticsearch indices");
            throw;
        }

        return app;
    }

    #endregion
}
