#region using

using Common.Configurations;
using Catalog.Worker.Outbox.Processors;

#endregion

namespace Catalog.Worker.Outbox.BackgroundServices;

internal class OutboxBackgroundService : BackgroundService
{
    #region Fields, Properties and Indexers
    
    private readonly int _processorFrequency;

    private readonly int _maxParallelism;

    private int _totalIterations = 0;
    
    private int _totalProcessedMessage = 0;

    private readonly IServiceScopeFactory _serviceScopeFactory;

    private readonly ILogger<OutboxBackgroundService> _logger;

    #endregion

    #region Ctors

    public OutboxBackgroundService(
        IServiceScopeFactory serviceScopeFactory,
        IConfiguration cfg,
        ILogger<OutboxBackgroundService> logger)
    {
        _processorFrequency = cfg.GetValue<int>($"{WorkerCfg.Outbox.Section}:{WorkerCfg.Outbox.ProcessorFrequency}", 5);
        _maxParallelism = cfg.GetValue<int>($"{WorkerCfg.Outbox.Section}:{WorkerCfg.Outbox.MaxParallelism}", 5);
        _serviceScopeFactory = serviceScopeFactory;
        _logger = logger;
    }

    #endregion

    #region Methods

    protected override async Task ExecuteAsync(CancellationToken cancellationToken)
    {
        _logger.LogInformation("Outbox processor started");
        
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
            _logger.LogInformation("Outbox processor operation cancelled");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while processing outbox messages");
        }
    }

    private async Task ProcessOutboxMessages(CancellationToken cancellationToken)
    {
        using var scope = _serviceScopeFactory.CreateScope();
        var outboxProcessor = scope.ServiceProvider.GetRequiredService<OutboxProcessor>();

        while (!cancellationToken.IsCancellationRequested)
        {
            int processedMessages = await outboxProcessor.ExecuteAsync(cancellationToken);
            var totalProcessedMessages = Interlocked.Add(ref _totalProcessedMessage, processedMessages);

            // Only log if there were messages processed or every 100 iterations
            var iterationCount = Interlocked.Increment(ref _totalIterations);
            if (processedMessages > 0 || iterationCount % 100 == 0)
            {
                _logger.LogInformation("Iteration {IterationCount}: Processed {ProcessedMessages} messages. Total: {TotalProcessedMessages}", 
                    iterationCount, processedMessages, totalProcessedMessages);
            }

            await Task.Delay(TimeSpan.FromSeconds(_processorFrequency), cancellationToken);
        }
    }

    #endregion
}