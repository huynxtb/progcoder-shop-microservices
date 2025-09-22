namespace Catalog.Worker.Consumer.BackgroundServices;

public class CatalogBackgroudService(ILogger<CatalogBackgroudService> logger) : BackgroundService
{
    #region Methods

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        logger.LogInformation("Worker starting at: {time}", DateTimeOffset.Now);

        while (!stoppingToken.IsCancellationRequested)
        {
            await Task.Delay(1000, stoppingToken);
        }

        logger.LogInformation("Worker stoping at: {time}", DateTimeOffset.Now);
    }

    #endregion
}
