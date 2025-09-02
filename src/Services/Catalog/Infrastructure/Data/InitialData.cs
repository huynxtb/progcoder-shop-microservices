#region using

using BuildingBlocks.Abstractions.ValueObjects;
using Catalog.Domain.Entities;
using Marten;
using Marten.Schema;

#endregion

public sealed class InitialCategoryData : IInitialData
{
    #region Implementations

    public async Task Populate(IDocumentStore store, CancellationToken cancellation)
    {
        await using var session = store.LightweightSession();

        var electronicsId = Guid.Parse("a2d8c5a8-2a64-4b6d-a1c0-0c8b4b9c1a11");
        var phonesId = Guid.Parse("b61c0f19-8d1c-4a2e-8f9a-3b5a85d17e12");
        var laptopsId = Guid.Parse("6f6b1e0b-65b0-4c42-9a8d-2a5b3e7c8f13");
        var fashionId = Guid.Parse("c9f4a1b2-1b23-4db3-8f1e-9c3d1a2b3c14");
        var menFashionId = Guid.Parse("d1a2b3c4-5e6f-4a1b-9c8d-7e6f5a4b3c15");
        var womenFashionId = Guid.Parse("e2b3c4d5-6f7a-4b1c-8d9e-6f5a4b3c2d16");
        var homeId = Guid.Parse("f3c4d5e6-7a8b-4c1d-9e8f-5a4b3c2d1e17");

        var categories = new[]
        {
            CategoryEntity.Create(
                id: electronicsId,
                name: "Electronics",
                desctiption: "Electronic devices & accessories",
                slug: "electronics",
                performedBy: Actor.System("catalog-service").ToString()),

            CategoryEntity.Create(
                id: phonesId,
                name: "Phones",
                desctiption: "Smartphones & accessories",
                slug: "phones",
                parentId: electronicsId,
                performedBy: Actor.System("catalog-service").ToString()),

            CategoryEntity.Create(
                id: laptopsId,
                name: "Laptops",
                desctiption: "Laptops & accessories",
                slug: "laptops",
                parentId: electronicsId,
                performedBy: Actor.System("catalog-service").ToString()),

            CategoryEntity.Create(
                id: fashionId,
                name: "Fashion",
                desctiption: "Clothing, shoes & accessories",
                slug: "fashion",
                performedBy : Actor.System("catalog-service").ToString()),

            CategoryEntity.Create(
                id: menFashionId,
                name: "Men",
                desctiption: "Men's fashion",
                slug: "men",
                parentId: fashionId,
                performedBy: Actor.System("catalog-service").ToString()),

            CategoryEntity.Create(
                id: womenFashionId,
                name: "Women",
                desctiption: "Women's fashion",
                slug: "women",
                parentId: fashionId,
                performedBy : Actor.System("catalog-service").ToString()),

            CategoryEntity.Create(
                id: homeId,
                name: "Home & Living",
                desctiption: "Household goods & furniture",
                slug: "home-living",
                performedBy : Actor.System("catalog-service").ToString())
        };

        session.Store(categories);
        await session.SaveChangesAsync(cancellation);
    }

    #endregion
}
