#region using

using Catalog.Domain.Entities;

#endregion

namespace Catalog.Infrastructure.Data;

public static class BrandSeedData
{
    #region Constants

    public static readonly Guid ZaraId = Guid.Parse("f4d5e6f7-8a9b-4c1e-0f1a-4b3c2d1e2f10");
    public static readonly Guid GucciId = Guid.Parse("f4d5e6f7-8a9b-4c1e-0f1a-4b3c2d1e2f11");
    public static readonly Guid ChanelId = Guid.Parse("f4d5e6f7-8a9b-4c1e-0f1a-4b3c2d1e2f12");
    public static readonly Guid LouisVuittonId = Guid.Parse("f4d5e6f7-8a9b-4c1e-0f1a-4b3c2d1e2f13");
    public static readonly Guid MangoId = Guid.Parse("f4d5e6f7-8a9b-4c1e-0f1a-4b3c2d1e2f14");
    public static readonly Guid AppleId = Guid.Parse("f4d5e6f7-8a9b-4c1e-0f1a-4b3c2d1e2f15");
    public static readonly Guid SamsungId = Guid.Parse("f4d5e6f7-8a9b-4c1e-0f1a-4b3c2d1e2f16");
    public static readonly Guid XiaomiId = Guid.Parse("f4d5e6f7-8a9b-4c1e-0f1a-4b3c2d1e2f17");
    public static readonly Guid OppoId = Guid.Parse("f4d5e6f7-8a9b-4c1e-0f1a-4b3c2d1e2f18");
    public static readonly Guid HuaweiId = Guid.Parse("f4d5e6f7-8a9b-4c1e-0f1a-4b3c2d1e2f19");
    public static readonly Guid RealmeId = Guid.Parse("f4d5e6f7-8a9b-4c1e-0f1a-4b3c2d1e2f20");

    #endregion

    #region Methods

    public static BrandEntity[] GetBrands(string performedBy)
    {
        return new[]
        {
            BrandEntity.Create(
                id: ZaraId,
                name: "Zara",
                slug: "zara",
                performedBy: performedBy),

            BrandEntity.Create(
                id: GucciId,
                name: "Gucci",
                slug: "gucci",
                performedBy: performedBy),

            BrandEntity.Create(
                id: ChanelId,
                name: "Chanel",
                slug: "chanel",
                performedBy: performedBy),

            BrandEntity.Create(
                id: LouisVuittonId,
                name: "Louis Vuitton",
                slug: "louis-vuitton",
                performedBy: performedBy),

            BrandEntity.Create(
                id: MangoId,
                name: "Mango",
                slug: "mango",
                performedBy: performedBy),

            BrandEntity.Create(
                id: AppleId,
                name: "Apple",
                slug: "apple",
                performedBy: performedBy),

            BrandEntity.Create(
                id: SamsungId,
                name: "Samsung",
                slug: "samsung",
                performedBy: performedBy),

            BrandEntity.Create(
                id: XiaomiId,
                name: "Xiaomi",
                slug: "xiaomi",
                performedBy: performedBy),

            BrandEntity.Create(
                id: OppoId,
                name: "Oppo",
                slug: "oppo",
                performedBy: performedBy),

            BrandEntity.Create(
                id: HuaweiId,
                name: "Huawei",
                slug: "huawei",
                performedBy: performedBy),

            BrandEntity.Create(
                id: RealmeId,
                name: "Realme",
                slug: "realme",
                performedBy: performedBy)
        };
    }

    #endregion
}

