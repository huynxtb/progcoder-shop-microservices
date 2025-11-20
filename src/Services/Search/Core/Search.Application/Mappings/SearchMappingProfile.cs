#region using

using AutoMapper;
using Search.Application.Dtos.Products;
using Search.Domain.Entities;

#endregion

namespace Search.Application.Mappings;

public sealed class SearchMappingProfile : Profile
{
    #region Ctors

    public SearchMappingProfile()
    {
        CreateEntityMappings();
    }

    #endregion

    #region Methods

    private void CreateEntityMappings()
    {
        // ProductEntity -> ProductDto
        CreateMap<ProductEntity, ProductDto>()
            .ForMember(dest => dest.DisplayStatus, opt => opt.MapFrom(src => src.Status.GetDescription()));

        // UpsertProductDto -> ProductEntity
        CreateMap<UpsertProductDto, ProductEntity>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.ProductId));
    }

    #endregion
}

