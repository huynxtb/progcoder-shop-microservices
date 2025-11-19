#region using

using AutoMapper;
using Order.Application.Dtos.Orders;
using Order.Application.Dtos.ValueObjects;
using Order.Domain.Entities;
using Order.Domain.ValueObjects;

#endregion

namespace Order.Application.Mappings;

public sealed class OrderMappingProfile : Profile
{
    #region Ctors

    public OrderMappingProfile()
    {
        CreateValueObjectMappings();
        CreateEntityMappings();
        CreateDtoMappings();
    }

    #endregion

    #region Methods

    private void CreateValueObjectMappings()
    {
        // Customer mappings
        CreateMap<Customer, CustomerDto>()
            .ReverseMap();

        // Address mappings
        CreateMap<Address, AddressDto>()
            .ReverseMap();

        // Discount mappings
        CreateMap<Discount, DiscountDto>()
            .ReverseMap();

        // Product mappings
        CreateMap<Product, ProductDto>()
            .ReverseMap();
    }

    private void CreateEntityMappings()
    {
        // OrderEntity -> OrderDto
        CreateMap<OrderEntity, OrderDto>()
            .ForMember(dest => dest.OrderNo, opt => opt.MapFrom(src => src.OrderNo.Value))
            .ForMember(dest => dest.DisplayStatus, opt => opt.MapFrom(src => src.Status.GetDescription()));

        // OrderItemEntity -> OrderItemDto
        CreateMap<OrderItemEntity, OrderItemDto>();
    }

    private void CreateDtoMappings()
    {
        // CreateOrUpdateOrderDto -> OrderEntity
        CreateMap<CreateOrUpdateOrderDto, OrderEntity>()
            .ForMember(dest => dest.Id, opt => opt.Ignore())
            .ForMember(dest => dest.OrderNo, opt => opt.Ignore())
            .ForMember(dest => dest.Status, opt => opt.Ignore())
            .ForMember(dest => dest.OrderItems, opt => opt.Ignore())
            .ForMember(dest => dest.Discount, opt => opt.Ignore())
            .ForMember(dest => dest.CreatedOnUtc, opt => opt.Ignore())
            .ForMember(dest => dest.CreatedBy, opt => opt.Ignore())
            .ForMember(dest => dest.LastModifiedOnUtc, opt => opt.Ignore())
            .ForMember(dest => dest.LastModifiedBy, opt => opt.Ignore())
            .ForMember(dest => dest.Customer, opt => opt.MapFrom(src => src.Customer))
            .ForMember(dest => dest.ShippingAddress, opt => opt.MapFrom(src => src.ShippingAddress));

        // CreateOrderItemDto -> Product
        CreateMap<CreateOrderItemDto, Product>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.ProductId))
            .ForMember(dest => dest.Name, opt => opt.Ignore())
            .ForMember(dest => dest.ImageUrl, opt => opt.Ignore())
            .ForMember(dest => dest.Price, opt => opt.Ignore());
    }

    #endregion
}

