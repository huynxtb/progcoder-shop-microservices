#region using

using AutoMapper;
using Basket.Application.Dtos.Baskets;
using Basket.Domain.Entities;

#endregion

namespace Basket.Application.Mappings;

public sealed class BasketMappingProfile : Profile
{
    #region Ctors

    public BasketMappingProfile()
    {
        CreateShoppingCartMappings();
        CreateShoppingCartItemMappings();
    }

    #endregion

    #region Methods

    private void CreateShoppingCartMappings()
    {
        // ShoppingCartEntity -> ShoppingCartDto
        CreateMap<ShoppingCartEntity, ShoppingCartDto>()
            .ForMember(dest => dest.TotalPrice, opt => opt.MapFrom(src => src.TotalPrice));
    }

    private void CreateShoppingCartItemMappings()
    {
        // ShoppingCartItemEntity -> ShoppingCartItemDto
        CreateMap<ShoppingCartItemEntity, ShoppingCartItemDto>()
            .ForMember(dest => dest.ProductSlug, opt => opt.Ignore()); // ProductSlug might not exist in entity
    }

    #endregion
}

