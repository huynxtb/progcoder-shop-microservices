#region using

using AutoMapper;
using Catalog.Application.Dtos.Brands;
using Catalog.Application.Dtos.Categories;
using Catalog.Application.Dtos.Products;
using Catalog.Application.Models.Results;
using Catalog.Domain.Entities;

#endregion

namespace Catalog.Application.Mappings;

public sealed class CatalogMappingProfile : Profile
{
    #region Ctors

    public CatalogMappingProfile()
    {
        CreateProductMappings();
        CreateCategoryMappings();
        CreateBrandMappings();
        CreateImageMappings();
        CreateResultMappings();
    }

    #endregion

    #region Methods

    private void CreateProductMappings()
    {
        // ProductEntity -> ProductDto
        CreateMap<ProductEntity, ProductDto>()
            .ForMember(dest => dest.DisplayStatus, opt => opt.MapFrom(src => src.Status.GetDescription()));
        // All other properties (including Status) auto-map by convention

        // ProductEntity -> PublishProductDto
        CreateMap<ProductEntity, PublishProductDto>()
            .ForMember(dest => dest.DisplayStatus, opt => opt.MapFrom(src => src.Status.GetDescription()));
        // All other properties (including Status) auto-map by convention

        // ProductEntity -> GetProductByIdResult
        CreateMap<ProductEntity, GetProductByIdResult>()
            .ForMember(dest => dest.Product, opt => opt.MapFrom(src => src));
    }

    private void CreateCategoryMappings()
    {
        // CategoryEntity -> CategoryDto
        CreateMap<CategoryEntity, CategoryDto>();
        // All properties auto-map by convention
    }

    private void CreateBrandMappings()
    {
        // BrandEntity -> BrandDto
        CreateMap<BrandEntity, BrandDto>();
        // All properties auto-map by convention
    }

    private void CreateImageMappings()
    {
        // ProductImageEntity -> ProductImageDto
        CreateMap<ProductImageEntity, ProductImageDto>();

        // ProductImageEntity -> PublishProductImageDto
        CreateMap<ProductImageEntity, PublishProductImageDto>()
            .ForMember(dest => dest.FileName, opt => opt.MapFrom(src => src.FileName))
            .ForMember(dest => dest.PublicURL, opt => opt.MapFrom(src => src.PublicURL));

        // UploadFileBytes -> ProductImageEntity (used in commands)
        CreateMap<UploadFileBytes, ProductImageEntity>()
            .ForMember(dest => dest.FileId, opt => opt.Ignore())
            .ForMember(dest => dest.OriginalFileName, opt => opt.MapFrom(src => src.FileName))
            .ForMember(dest => dest.FileName, opt => opt.Ignore())
            .ForMember(dest => dest.PublicURL, opt => opt.Ignore());

        CreateMap<UploadFileResult, ProductImageEntity>()
            .ReverseMap();
    }

    private void CreateResultMappings()
    {
        // ProductEntity -> GetPublishProductByIdResult
        CreateMap<ProductEntity, GetPublishProductByIdResult>()
            .ForMember(dest => dest.Product, opt => opt.MapFrom(src => src));
    }

    #endregion
}

