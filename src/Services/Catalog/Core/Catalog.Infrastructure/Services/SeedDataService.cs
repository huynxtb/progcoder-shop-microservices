#region using

using Common.ValueObjects;
using Catalog.Application.Services;
using Catalog.Domain.Entities;
using Catalog.Infrastructure.Data;
using Marten;

#endregion

namespace Catalog.Infrastructure.Services;

public sealed class SeedDataService : ISeedDataService
{
    #region Implementations

    public async Task<bool> SeedDataAsync(IDocumentSession session, CancellationToken cancellationToken)
    {
        var hasChanges = false;
        var performedBy = Actor.System("catalog-service").ToString();

        if (!await session.Query<CategoryEntity>().AnyAsync(cancellationToken))
        {
            hasChanges = true;
            var categories = CategorySeedData.GetCategories(performedBy);
            session.Store(categories);
        }

        if (!await session.Query<BrandEntity>().AnyAsync(cancellationToken))
        {
            hasChanges = true;
            var brands = BrandSeedData.GetBrands(performedBy);
            session.Store(brands);
        }

        var productChanges = await SeedProductDataAsync(session, cancellationToken);
        if (productChanges)
        {
            hasChanges = true;
        }

        if (hasChanges)
        {
            await session.SaveChangesAsync(cancellationToken);
        }

        return hasChanges;
    }

    #endregion

    #region Private Methods

    private async Task<bool> SeedProductDataAsync(IDocumentSession session, CancellationToken cancellation)
    {
        var currentCount = await session.Query<ProductEntity>().CountAsync(cancellation);

        if (currentCount >= ProductSeedData.TargetProductCount)
        {
            return false;
        }

        var productsToCreate = ProductSeedData.TargetProductCount - currentCount;
        var allProducts = ProductSeedData.GetAllProducts(Actor.System("catalog-service").ToString());
        var productsToSeed = allProducts.Take(productsToCreate).ToArray();

        foreach (var product in productsToSeed)
        {
            ProductSeedData.AddProductImages(product);
        }

        session.Store(productsToSeed);

        return productsToSeed.Any();
    }

    #endregion
}

