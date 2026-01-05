#region using

using AutoMapper;
using Microsoft.Extensions.Logging;
using Search.Application.Dtos.Products;
using Search.Application.Repositories;
using Search.Domain.Entities;

#endregion

namespace Search.Application.Features.Product.Commands;

public sealed record UpsertProductCommand(UpsertProductDto Dto) : ICommand<bool>;

public sealed class UpsertProductCommandHandler(
    IProductRepository productRepository,
    IMapper mapper,
    ILogger<UpsertProductCommandHandler> logger) : ICommandHandler<UpsertProductCommand, bool>
{
    #region Implementations

    public async Task<bool> Handle(UpsertProductCommand command, CancellationToken cancellationToken)
    {
        var dto = command.Dto;

        // Map DTO to ProductEntity using AutoMapper
        var product = mapper.Map<ProductEntity>(dto);

        var result = await productRepository.UpsertAsync(product, cancellationToken);

        if (result)
        {
            logger.LogInformation("Successfully upserted product {ProductId} in Elasticsearch", dto.ProductId);
        }
        else
        {
            logger.LogWarning("Failed to upsert product {ProductId} in Elasticsearch", dto.ProductId);
        }

        return result;
    }

    #endregion
}

