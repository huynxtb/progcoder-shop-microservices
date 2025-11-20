#region using

using Microsoft.Extensions.Logging;
using Search.Application.Repositories;

#endregion

namespace Search.Application.CQRS.Product.Commands;

public sealed record DeleteProductCommand(string ProductId) : ICommand<bool>;

public sealed class DeleteProductCommandHandler(
    IProductRepository productRepository,
    ILogger<DeleteProductCommandHandler> logger) : ICommandHandler<DeleteProductCommand, bool>
{
    #region Implementations

    public async Task<bool> Handle(DeleteProductCommand command, CancellationToken cancellationToken)
    {
        var result = await productRepository.DeleteAsync(command.ProductId, cancellationToken);

        if (result)
        {
            logger.LogInformation("Successfully deleted product {ProductId} from Elasticsearch", command.ProductId);
        }
        else
        {
            logger.LogWarning("Failed to delete product {ProductId} from Elasticsearch", command.ProductId);
        }

        return result;
    }

    #endregion
}

