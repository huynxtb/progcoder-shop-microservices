#region using

using AutoMapper;
using Discount.Application.Dtos.Coupons;
using Discount.Domain.Entities;

#endregion

namespace Discount.Application.Mappings;

public sealed class DiscountMappingProfile : Profile
{
    #region Ctors

    public DiscountMappingProfile()
    {
        CreateCouponMappings();
    }

    #endregion

    #region Methods

    private void CreateCouponMappings()
    {
        // CouponEntity -> CouponDto
        CreateMap<CouponEntity, CouponDto>()
            .ForMember(dest => dest.DisplayStatus, opt => opt.MapFrom(src => src.Status.GetDescription()))
            .ForMember(dest => dest.IsValid, opt => opt.MapFrom(src => src.IsValid()))
            .ForMember(dest => dest.IsExpired, opt => opt.MapFrom(src => src.IsExpired()))
            .ForMember(dest => dest.IsOutOfUses, opt => opt.MapFrom(src => src.IsOutOfUses()));
    }

    #endregion
}

