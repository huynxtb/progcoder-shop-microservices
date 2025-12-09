#region using

using AutoMapper;
using Inventory.Application.Dtos.InventoryItems;
using Inventory.Domain.Entities;
using Inventory.Domain.ValueObjects;

#endregion

namespace Inventory.Application.Mappings;

public sealed class InventoryMappingProfile : Profile
{
    #region Ctors

    public InventoryMappingProfile()
    {
        CreateInventoryItemMappings();
        CreateLocationMappings();
        CreateProductMappings();
    }

    #endregion

    #region Methods

    private void CreateInventoryItemMappings()
    {
        // InventoryItemEntity -> InventoryItemDto
        CreateMap<InventoryItemEntity, InventoryItemDto>()
            .ForMember(dest => dest.ProductId, opt => opt.MapFrom(src => src.Product.Id))
            .ForMember(dest => dest.Available, opt => opt.MapFrom(src => src.Available));
    }

    private void CreateLocationMappings()
    {
        // LocationEntity -> LocationDto
        CreateMap<LocationEntity, LocationDto>();
    }

    private void CreateProductMappings()
    {
        // Product ValueObject -> ProductDto
        CreateMap<Product, ProductDto>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
            .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name));
    }

    #endregion
}

