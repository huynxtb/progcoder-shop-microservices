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
        while (!stoppingToken.IsCancellationRequested)
        {
            if (_logger.IsEnabled(LogLevel.Information))
            {
                _logger.LogInformation("Worker running at: {time}", DateTimeOffset.Now);
            }
            await Task.Delay(1000, stoppingToken);
        }
    }
}
