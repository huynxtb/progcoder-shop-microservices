#region using

using Order.Worker.Processors;

#endregion

namespace Order.Worker.BackgroundServices;

internal class OutboxBackgroundService(
    IServiceScopeFactory serviceScopeFactory,
    ILogger<OutboxBackgroundService> logger) : BackgroundService
{
    #region Fields, Properties and Indexers

    private const int OutboxProcessorFrequency = 5;
    
    private readonly int _maxParallelism = 5;
    
    private int _totalIterations = 0;
    
    private int _totalProcessedMessage = 0;

    #endregion

    #region Methods

    protected override async Task ExecuteAsync(CancellationToken cancellationToken)
    {
        logger.LogInformation("Outbox processor started");
        
        var parallelOptions = new ParallelOptions
        {
            MaxDegreeOfParallelism = _maxParallelism,
            CancellationToken = cancellationToken
        };

        try
        {
            await Parallel.ForEachAsync(
                Enumerable.Range(0, _maxParallelism),
                parallelOptions,
                async (_, token) =>
                {
                    await ProcessOutboxMessages(token);
                });
        }
        catch (OperationCanceledException)
        {
            logger.LogInformation("Outbox processor operation cancelled");
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "An error occurred while processing outbox messages");
        }
    }

    private async Task ProcessOutboxMessages(CancellationToken cancellationToken)
    {
        using var scope = serviceScopeFactory.CreateScope();
        var outboxProcessor = scope.ServiceProvider.GetRequiredService<OutboxProcessor>();

        while (!cancellationToken.IsCancellationRequested)
        {
            var iterationCount = Interlocked.Increment(ref _totalIterations);
            logger.LogDebug("Starting outbox processing iteration {IterationCount}", iterationCount);

            int processedMessages = await outboxProcessor.ExecuteAsync(cancellationToken);
            var totalProcessedMessages = Interlocked.Add(ref _totalProcessedMessage, processedMessages);

            logger.LogDebug("Completed outbox processing iteration {IterationCount}. Processed {ProcessedMessages} messages. Total processed: {TotalProcessedMessages}", iterationCount, processedMessages, totalProcessedMessages);

            await Task.Delay(TimeSpan.FromSeconds(OutboxProcessorFrequency), cancellationToken);
        }
    }

    #endregion
}