#region using

using Catalog.Domain.Entities;

#endregion

namespace Catalog.Infrastructure.Data;

public static class ProductSeedData
{
    #region Constants

    public const int TargetProductCount = 15;

    #endregion

    #region Methods

    public static ProductEntity[] GetAllProducts(string performedBy)
    {
        return new[]
        {
            ProductEntity.Create(
                id: Guid.Parse("a1b2c3d4-e5f6-4a1b-9c8d-7e6f5a4b3c21"),
                name: "iPhone 15 Pro",
                sku: "IPHONE-15-PRO-001",
                shortDescription: "Latest iPhone with A17 Pro chip and titanium design",
                longDescription: "The iPhone 15 Pro features a 6.1-inch Super Retina XDR display, A17 Pro chip for exceptional performance, advanced camera system with 48MP main camera, and titanium construction for durability. Available in Natural Titanium, Blue Titanium, White Titanium, and Black Titanium.",
                slug: "iphone-15-pro",
                price: 29990000,
                salePrice: 27990000,
                categoryIds: new List<Guid> { CategorySeedData.PhonesId, CategorySeedData.ElectronicsId },
                brandId: BrandSeedData.AppleId,
                performedBy: performedBy),

            ProductEntity.Create(
                id: Guid.Parse("a1b2c3d4-e5f6-4a1b-9c8d-7e6f5a4b3c22"),
                name: "Samsung Galaxy S24 Ultra",
                sku: "SAMSUNG-S24-ULTRA-001",
                shortDescription: "Premium Android flagship with S Pen and advanced AI features",
                longDescription: "The Samsung Galaxy S24 Ultra features a 6.8-inch Dynamic AMOLED 2X display, Snapdragon 8 Gen 3 processor, 200MP main camera with 100x Space Zoom, integrated S Pen, and AI-powered features. Built with titanium frame for premium durability.",
                slug: "samsung-galaxy-s24-ultra",
                price: 27990000,
                salePrice: null,
                categoryIds: new List<Guid> { CategorySeedData.PhonesId, CategorySeedData.ElectronicsId },
                brandId: BrandSeedData.SamsungId,
                performedBy: performedBy),

            ProductEntity.Create(
                id: Guid.Parse("a1b2c3d4-e5f6-4a1b-9c8d-7e6f5a4b3c23"),
                name: "MacBook Pro 16-inch M3 Pro",
                sku: "MACBOOK-PRO-16-M3-001",
                shortDescription: "Powerful laptop for professionals with M3 Pro chip",
                longDescription: "The MacBook Pro 16-inch features the M3 Pro chip with up to 12-core CPU and 19-core GPU, 16.2-inch Liquid Retina XDR display, up to 36GB unified memory, and all-day battery life. Perfect for video editing, software development, and creative work.",
                slug: "macbook-pro-16-inch-m3-pro",
                price: 59990000,
                salePrice: null,
                categoryIds: new List<Guid> { CategorySeedData.LaptopsId, CategorySeedData.ElectronicsId },
                brandId: BrandSeedData.AppleId,
                performedBy: performedBy),

            ProductEntity.Create(
                id: Guid.Parse("a1b2c3d4-e5f6-4a1b-9c8d-7e6f5a4b3c24"),
                name: "Dell XPS 15",
                sku: "DELL-XPS-15-001",
                shortDescription: "Premium Windows laptop with OLED display",
                longDescription: "The Dell XPS 15 features a 15.6-inch OLED 3.5K display, Intel Core i7 processor, NVIDIA RTX graphics, up to 32GB RAM, and premium build quality. Ideal for content creators and professionals.",
                slug: "dell-xps-15",
                price: 45990000,
                salePrice: 42990000,
                categoryIds: new List<Guid> { CategorySeedData.LaptopsId, CategorySeedData.ElectronicsId },
                brandId: null,
                performedBy: performedBy),

            ProductEntity.Create(
                id: Guid.Parse("a1b2c3d4-e5f6-4a1b-9c8d-7e6f5a4b3c25"),
                name: "Áo Sơ Mi Nam Cổ Điển",
                sku: "ZARA-SHIRT-MEN-001",
                shortDescription: "Áo sơ mi nam cổ điển chất liệu cotton cao cấp",
                longDescription: "Áo sơ mi nam thiết kế cổ điển với chất liệu cotton 100% mềm mại, thoáng khí. Form dáng vừa vặn, phù hợp cho công sở và các dịp trang trọng. Có nhiều màu sắc và size từ S đến XXL.",
                slug: "ao-so-mi-nam-co-dien",
                price: 890000,
                salePrice: 690000,
                categoryIds: new List<Guid> { CategorySeedData.MenFashionId, CategorySeedData.FashionId },
                brandId: BrandSeedData.ZaraId,
                performedBy: performedBy),

            ProductEntity.Create(
                id: Guid.Parse("a1b2c3d4-e5f6-4a1b-9c8d-7e6f5a4b3c26"),
                name: "Quần Jeans Nữ Skinny",
                sku: "ZARA-JEANS-WOMEN-001",
                shortDescription: "Quần jeans nữ dáng skinny co giãn cao cấp",
                longDescription: "Quần jeans nữ dáng skinny với chất liệu denim co giãn, ôm sát tạo dáng đẹp. Thiết kế hiện đại với nhiều màu sắc như xanh đậm, xanh nhạt, đen. Phù hợp mix & match với nhiều trang phục khác nhau.",
                slug: "quan-jeans-nu-skinny",
                price: 1290000,
                salePrice: 990000,
                categoryIds: new List<Guid> { CategorySeedData.WomenFashionId, CategorySeedData.FashionId },
                brandId: BrandSeedData.ZaraId,
                performedBy: performedBy),

            ProductEntity.Create(
                id: Guid.Parse("a1b2c3d4-e5f6-4a1b-9c8d-7e6f5a4b3c27"),
                name: "Áo Khoác Nam Bomber",
                sku: "MANGO-JACKET-MEN-001",
                shortDescription: "Áo khoác nam bomber phong cách streetwear",
                longDescription: "Áo khoác nam bomber với thiết kế hiện đại, phong cách streetwear. Chất liệu polyester chống nước nhẹ, có lớp lót ấm áp. Phù hợp cho mùa thu đông, có nhiều màu sắc trẻ trung.",
                slug: "ao-khoac-nam-bomber",
                price: 1890000,
                salePrice: null,
                categoryIds: new List<Guid> { CategorySeedData.MenFashionId, CategorySeedData.FashionId },
                brandId: BrandSeedData.MangoId,
                performedBy: performedBy),

            ProductEntity.Create(
                id: Guid.Parse("a1b2c3d4-e5f6-4a1b-9c8d-7e6f5a4b3c28"),
                name: "Giày Thể Thao Nữ",
                sku: "ZARA-SNEAKERS-WOMEN-001",
                shortDescription: "Giày thể thao nữ đế cao su êm ái",
                longDescription: "Giày thể thao nữ với thiết kế năng động, đế cao su chống trượt và đệm lót êm ái. Phù hợp cho đi bộ, chạy bộ và các hoạt động thể thao hàng ngày. Có nhiều size và màu sắc.",
                slug: "giay-the-thao-nu",
                price: 1590000,
                salePrice: 1290000,
                categoryIds: new List<Guid> { CategorySeedData.WomenFashionId, CategorySeedData.FashionId },
                brandId: BrandSeedData.ZaraId,
                performedBy: performedBy),

            ProductEntity.Create(
                id: Guid.Parse("a1b2c3d4-e5f6-4a1b-9c8d-7e6f5a4b3c29"),
                name: "Túi Xách Gucci",
                sku: "GUCCI-HANDBAG-001",
                shortDescription: "Túi xách cao cấp Gucci da thật",
                longDescription: "Túi xách Gucci được làm từ da thật cao cấp với logo GG đặc trưng. Thiết kế sang trọng, phù hợp cho các dịp quan trọng. Có nhiều màu sắc và kích thước khác nhau.",
                slug: "tui-xach-gucci",
                price: 45900000,
                salePrice: null,
                categoryIds: new List<Guid> { CategorySeedData.WomenFashionId, CategorySeedData.FashionId },
                brandId: BrandSeedData.GucciId,
                performedBy: performedBy),

            ProductEntity.Create(
                id: Guid.Parse("a1b2c3d4-e5f6-4a1b-9c8d-7e6f5a4b3c30"),
                name: "Bàn Làm Việc Gỗ",
                sku: "DESK-WOOD-001",
                shortDescription: "Bàn làm việc gỗ tự nhiên thiết kế hiện đại",
                longDescription: "Bàn làm việc được làm từ gỗ tự nhiên cao cấp, bề mặt phủ sơn bảo vệ chống trầy xước. Thiết kế hiện đại với ngăn kéo tiện lợi. Kích thước phù hợp cho không gian văn phòng và làm việc tại nhà.",
                slug: "ban-lam-viec-go",
                price: 4590000,
                salePrice: 3990000,
                categoryIds: new List<Guid> { CategorySeedData.HomeId },
                brandId: null,
                performedBy: performedBy),

            ProductEntity.Create(
                id: Guid.Parse("a1b2c3d4-e5f6-4a1b-9c8d-7e6f5a4b3c31"),
                name: "Ghế Văn Phòng Ergonomic",
                sku: "CHAIR-ERGONOMIC-001",
                shortDescription: "Ghế văn phòng ergonomic hỗ trợ lưng tốt",
                longDescription: "Ghế văn phòng thiết kế ergonomic với đệm lưng và đệm ngồi êm ái. Có thể điều chỉnh độ cao, tựa lưng và tay vịn. Phù hợp cho làm việc lâu dài, giảm mệt mỏi và đau lưng.",
                slug: "ghe-van-phong-ergonomic",
                price: 3290000,
                salePrice: null,
                categoryIds: new List<Guid> { CategorySeedData.HomeId },
                brandId: null,
                performedBy: performedBy),

            ProductEntity.Create(
                id: Guid.Parse("a1b2c3d4-e5f6-4a1b-9c8d-7e6f5a4b3c32"),
                name: "Đèn Bàn LED",
                sku: "LAMP-LED-DESK-001",
                shortDescription: "Đèn bàn LED điều chỉnh độ sáng",
                longDescription: "Đèn bàn LED với công nghệ chiếu sáng không chói mắt, có thể điều chỉnh độ sáng và góc chiếu. Thiết kế hiện đại, tiết kiệm điện năng. Phù hợp cho học tập và làm việc ban đêm.",
                slug: "den-ban-led",
                price: 890000,
                salePrice: 690000,
                categoryIds: new List<Guid> { CategorySeedData.HomeId },
                brandId: null,
                performedBy: performedBy),

            ProductEntity.Create(
                id: Guid.Parse("a1b2c3d4-e5f6-4a1b-9c8d-7e6f5a4b3c33"),
                name: "Tủ Sách 5 Tầng",
                sku: "BOOKSHELF-5-TIER-001",
                shortDescription: "Tủ sách 5 tầng gỗ công nghiệp",
                longDescription: "Tủ sách 5 tầng được làm từ gỗ công nghiệp MDF cao cấp, bề mặt phủ melamine chống ẩm. Thiết kế đơn giản, dễ lắp ráp. Phù hợp để trưng bày sách, đồ trang trí và các vật dụng khác.",
                slug: "tu-sach-5-tang",
                price: 2490000,
                salePrice: null,
                categoryIds: new List<Guid> { CategorySeedData.HomeId },
                brandId: null,
                performedBy: performedBy),

            ProductEntity.Create(
                id: Guid.Parse("a1b2c3d4-e5f6-4a1b-9c8d-7e6f5a4b3c34"),
                name: "Xiaomi Redmi Note 13 Pro",
                sku: "XIAOMI-REDMI-NOTE-13-001",
                shortDescription: "Smartphone giá rẻ hiệu năng cao",
                longDescription: "Xiaomi Redmi Note 13 Pro với màn hình AMOLED 6.67 inch, chip Snapdragon 7s Gen 2, camera 200MP, pin 5100mAh sạc nhanh 67W. Giá cả phải chăng với hiệu năng mạnh mẽ.",
                slug: "xiaomi-redmi-note-13-pro",
                price: 7990000,
                salePrice: 6990000,
                categoryIds: new List<Guid> { CategorySeedData.PhonesId, CategorySeedData.ElectronicsId },
                brandId: null,
                performedBy: performedBy),

            ProductEntity.Create(
                id: Guid.Parse("a1b2c3d4-e5f6-4a1b-9c8d-7e6f5a4b3c35"),
                name: "Áo Thun Nam Cổ Tròn",
                sku: "ZARA-TSHIRT-MEN-001",
                shortDescription: "Áo thun nam cổ tròn chất liệu cotton",
                longDescription: "Áo thun nam cổ tròn với chất liệu cotton 100% mềm mại, thoáng mát. Thiết kế đơn giản, dễ phối đồ. Có nhiều màu sắc cơ bản như trắng, đen, xám, xanh navy. Phù hợp cho mùa hè.",
                slug: "ao-thun-nam-co-tron",
                price: 490000,
                salePrice: null,
                categoryIds: new List<Guid> { CategorySeedData.MenFashionId, CategorySeedData.FashionId },
                brandId: BrandSeedData.ZaraId,
                performedBy: performedBy)
        };
    }

    public static string GetThumbnailUrl(string productName)
    {
        return productName.ToLower() switch
        {
            "iphone 15 pro" => "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&h=800&fit=crop",
            "samsung galaxy s24 ultra" => "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&h=800&fit=crop",
            "macbook pro 16-inch m3 pro" => "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&h=800&fit=crop",
            "dell xps 15" => "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=800&fit=crop",
            "áo sơ mi nam cổ điển" => "https://images.unsplash.com/photo-1594938291221-94f18b6fa0e1?w=800&h=800&fit=crop",
            "quần jeans nữ skinny" => "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&h=800&fit=crop",
            "áo khoác nam bomber" => "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=800&fit=crop",
            "giày thể thao nữ" => "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop",
            "túi xách gucci" => "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&h=800&fit=crop",
            "bàn làm việc gỗ" => "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=800&fit=crop",
            "ghế văn phòng ergonomic" => "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800&h=800&fit=crop",
            "đèn bàn led" => "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&h=800&fit=crop",
            "tủ sách 5 tầng" => "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=800&fit=crop",
            "xiaomi redmi note 13 pro" => "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=800&fit=crop",
            "áo thun nam cổ tròn" => "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=800&fit=crop",
            _ => "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=800&fit=crop"
        };
    }

    public static List<string> GetProductImages(string productName)
    {
        return productName.ToLower() switch
        {
            "iphone 15 pro" => new List<string>
            {
                "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=1200&h=1200&fit=crop",
                "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1200&h=1200&fit=crop",
                "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=1200&h=1200&fit=crop"
            },
            "samsung galaxy s24 ultra" => new List<string>
            {
                "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=1200&h=1200&fit=crop",
                "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1200&h=1200&fit=crop",
                "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=1200&h=1200&fit=crop"
            },
            "macbook pro 16-inch m3 pro" => new List<string>
            {
                "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=1200&h=1200&fit=crop",
                "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=1200&h=1200&fit=crop",
                "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=1200&h=1200&fit=crop"
            },
            "dell xps 15" => new List<string>
            {
                "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=1200&h=1200&fit=crop",
                "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=1200&h=1200&fit=crop",
                "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=1200&h=1200&fit=crop"
            },
            "áo sơ mi nam cổ điển" => new List<string>
            {
                "https://images.unsplash.com/photo-1594938291221-94f18b6fa0e1?w=1200&h=1200&fit=crop",
                "https://images.unsplash.com/photo-1622445275576-721325763afe?w=1200&h=1200&fit=crop",
                "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=1200&h=1200&fit=crop"
            },
            "quần jeans nữ skinny" => new List<string>
            {
                "https://images.unsplash.com/photo-1542272604-787c3835535d?w=1200&h=1200&fit=crop",
                "https://images.unsplash.com/photo-1582418702059-97ebafbcdb1d?w=1200&h=1200&fit=crop",
                "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=1200&h=1200&fit=crop"
            },
            "áo khoác nam bomber" => new List<string>
            {
                "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=1200&h=1200&fit=crop",
                "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=1200&h=1200&fit=crop",
                "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=1200&h=1200&fit=crop"
            },
            "giày thể thao nữ" => new List<string>
            {
                "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&h=1200&fit=crop",
                "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=1200&h=1200&fit=crop",
                "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=1200&h=1200&fit=crop"
            },
            "túi xách gucci" => new List<string>
            {
                "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=1200&h=1200&fit=crop",
                "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1200&h=1200&fit=crop",
                "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=1200&h=1200&fit=crop"
            },
            "bàn làm việc gỗ" => new List<string>
            {
                "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=1200&fit=crop",
                "https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=1200&h=1200&fit=crop",
                "https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=1200&h=1200&fit=crop"
            },
            "ghế văn phòng ergonomic" => new List<string>
            {
                "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=1200&h=1200&fit=crop",
                "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=1200&fit=crop",
                "https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=1200&h=1200&fit=crop"
            },
            "đèn bàn led" => new List<string>
            {
                "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=1200&h=1200&fit=crop",
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=1200&fit=crop",
                "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=1200&h=1200&fit=crop"
            },
            "tủ sách 5 tầng" => new List<string>
            {
                "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=1200&fit=crop",
                "https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=1200&h=1200&fit=crop",
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=1200&fit=crop"
            },
            "xiaomi redmi note 13 pro" => new List<string>
            {
                "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1200&h=1200&fit=crop",
                "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=1200&h=1200&fit=crop",
                "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=1200&h=1200&fit=crop"
            },
            "áo thun nam cổ tròn" => new List<string>
            {
                "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1200&h=1200&fit=crop",
                "https://images.unsplash.com/photo-1594938291221-94f18b6fa0e1?w=1200&h=1200&fit=crop",
                "https://images.unsplash.com/photo-1622445275576-721325763afe?w=1200&h=1200&fit=crop"
            },
            _ => new List<string>
            {
                "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=1200&fit=crop",
                "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=1200&fit=crop",
                "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=1200&fit=crop"
            }
        };
    }

    public static void AddProductImages(ProductEntity product)
    {
        var thumbnail = new ProductImageEntity
        {
            PublicURL = GetThumbnailUrl(product.Name!),
            FileName = $"{product.Slug}-thumbnail.jpg",
            OriginalFileName = $"{product.Slug}-thumbnail.jpg"
        };

        var images = GetProductImages(product.Name!).Select(url => new ProductImageEntity
        {
            PublicURL = url,
            FileName = $"{product.Slug}-{Guid.NewGuid()}.jpg",
            OriginalFileName = $"{product.Slug}-{Guid.NewGuid()}.jpg"
        }).ToList();

        product.AddOrUpdateThumbnail(thumbnail);
        product.AddOrUpdateImages(images);
    }

    #endregion
}

