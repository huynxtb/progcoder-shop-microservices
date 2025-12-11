#region using

using Catalog.Domain.Entities;

#endregion

namespace Catalog.Infrastructure.Data;

public static class CategorySeedData
{
    #region Constants

    public static readonly Guid ElectronicsId = Guid.Parse("a2d8c5a8-2a64-4b6d-a1c0-0c8b4b9c1a11");
    public static readonly Guid PhonesId = Guid.Parse("b61c0f19-8d1c-4a2e-8f9a-3b5a85d17e12");
    public static readonly Guid LaptopsId = Guid.Parse("6f6b1e0b-65b0-4c42-9a8d-2a5b3e7c8f13");
    public static readonly Guid FashionId = Guid.Parse("c9f4a1b2-1b23-4db3-8f1e-9c3d1a2b3c14");
    public static readonly Guid MenFashionId = Guid.Parse("d1a2b3c4-5e6f-4a1b-9c8d-7e6f5a4b3c15");
    public static readonly Guid WomenFashionId = Guid.Parse("e2b3c4d5-6f7a-4b1c-8d9e-6f5a4b3c2d16");
    public static readonly Guid HomeId = Guid.Parse("f3c4d5e6-7a8b-4c1d-9e8f-5a4b3c2d1e17");

    #endregion

    #region Methods

    public static CategoryEntity[] GetCategories(string performedBy)
    {
        return new[]
        {
            CategoryEntity.Create(
                id: ElectronicsId,
                name: "Electronics",
                desctiption: "Electronic devices & accessories",
                slug: "electronics",
                performedBy: performedBy),

            CategoryEntity.Create(
                id: PhonesId,
                name: "Phones",
                desctiption: "Smartphones & accessories",
                slug: "phones",
                parentId: ElectronicsId,
                performedBy: performedBy),

            CategoryEntity.Create(
                id: LaptopsId,
                name: "Laptops",
                desctiption: "Laptops & accessories",
                slug: "laptops",
                parentId: ElectronicsId,
                performedBy: performedBy),

            CategoryEntity.Create(
                id: FashionId,
                name: "Fashion",
                desctiption: "Clothing, shoes & accessories",
                slug: "fashion",
                performedBy: performedBy),

            CategoryEntity.Create(
                id: MenFashionId,
                name: "Men",
                desctiption: "Men's fashion",
                slug: "men",
                parentId: FashionId,
                performedBy: performedBy),

            CategoryEntity.Create(
                id: WomenFashionId,
                name: "Women",
                desctiption: "Women's fashion",
                slug: "women",
                parentId: FashionId,
                performedBy: performedBy),

            CategoryEntity.Create(
                id: HomeId,
                name: "Home & Living",
                desctiption: "Household goods & furniture",
                slug: "home-living",
                performedBy: performedBy)
        };
    }

    #endregion
}

