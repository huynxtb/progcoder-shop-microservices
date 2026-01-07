#region using

using Report.Application.Dtos.DashboardTotals;
using Report.Application.Dtos.OrderGrowthLineCharts;
using Report.Application.Dtos.TopProductPieCharts;
using Report.Domain.Entities;

#endregion

namespace Report.Application.Mappings;

public sealed class ReportMappingProfile : Profile
{
    #region Ctors

    public ReportMappingProfile()
    {
        CreateMap<DashboardTotalEntity, DashboardTotalDto>();
        CreateMap<OrderGrowthLineChartEntity, OrderGrowthLineChartDto>();
        CreateMap<TopProductPieChartEntity, TopProductPieChartDto>();
    }

    #endregion
}

