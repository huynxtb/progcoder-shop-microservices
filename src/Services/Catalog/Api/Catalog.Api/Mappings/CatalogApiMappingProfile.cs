#region using

using AutoMapper;
using Catalog.Api.Models;
using Catalog.Application.Dtos.Products;

#endregion

namespace Catalog.Api.Mappings;

public sealed class CatalogApiMappingProfile : Profile
{
    #region Ctors

    public CatalogApiMappingProfile()
    {
        // CreateProductRequest -> CreateProductDto
        CreateMap<CreateProductRequest, CreateProductDto>()
            .ForMember(dest => dest.Files, opt => opt.Ignore()); // Files are handled separately

        // UpdateProductRequest -> UpdateProductDto
        CreateMap<UpdateProductRequest, UpdateProductDto>()
            .ForMember(dest => dest.Files, opt => opt.Ignore()); // Files are handled separately
    }

    #endregion
}

