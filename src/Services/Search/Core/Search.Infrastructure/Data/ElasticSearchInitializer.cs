#region using

using Nest;
using Polly;
using Search.Domain.Enums;

#endregion

namespace Search.Infrastructure.Data;

public sealed class ElasticSearchInitializer(IElasticClient elasticClient)
{
    public async Task InitializeAsync()
    {
        await CreateProductIndexAsync();
    }

    private async Task CreateProductIndexAsync()
    {
        var retryPolicy = Polly.Policy
            .Handle<Exception>()
            .WaitAndRetryAsync(5, i => TimeSpan.FromSeconds(5 * i));

        var circuitBreakerPolicy = Polly.Policy
            .Handle<Exception>()
            .CircuitBreakerAsync(2, TimeSpan.FromSeconds(30));

        var result = await retryPolicy
            .WrapAsync(circuitBreakerPolicy)
            .ExecuteAsync(async () =>
            {
                var indexName = ElasticIndex.Products.GetDescription();

                var indexExistsResponse = await elasticClient.Indices.ExistsAsync(indexName);

                if (indexExistsResponse.Exists) return true;

                var createIndexResponse = await elasticClient.Indices.CreateAsync(
                        indexName,
                        c => c.ConfigureProductMapping());

                return createIndexResponse.IsValid;
            });
    }
}
