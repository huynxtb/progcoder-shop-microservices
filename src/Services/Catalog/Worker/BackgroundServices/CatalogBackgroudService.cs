namespace Catalog.Worker.BackgroundServices;

public class CatalogBackgroudService : BackgroundService
{
    private readonly ILogger<CatalogBackgroudService> _logger;

    public CatalogBackgroudService(ILogger<CatalogBackgroudService> logger)
    {
        _logger = logger;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        _logger.LogInformation("Worker starting at: {time}", DateTimeOffset.Now);

        while (!stoppingToken.IsCancellationRequested)
        {
            await Task.Delay(1000, stoppingToken);
        }

        _logger.LogInformation("Worker stoping at: {time}", DateTimeOffset.Now);
    }
}
