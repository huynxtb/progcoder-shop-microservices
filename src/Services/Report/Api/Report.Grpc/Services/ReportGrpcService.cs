#region using

using BuildingBlocks.Abstractions.ValueObjects;
using Common.Constants;
using Grpc.Core;
using MediatR;
using Report.Application.CQRS.DashboardTotal.Commands;
using Report.Application.CQRS.OrderGrowthLineChart.Commands;
using Report.Application.CQRS.TopProductPieChart.Commands;
using Report.Application.Dtos.DashboardTotals;
using Report.Application.Dtos.OrderGrowthLineCharts;
using Report.Application.Dtos.TopProductPieCharts;

#endregion

namespace Report.Grpc.Services;

public sealed class ReportGrpcService(ISender sender) : ReportGrpc.ReportGrpcBase
{
    #region Methods

    public override async Task<PutDashboardTotalResponse> PutDashboardTotal(PutDashboardTotalRequest request, ServerCallContext context)
    {
        var dto = new UpdateDashboardTotalDto
        {
            Title = request.Title,
            Count = request.Count
        };

        var command = new UpdateDashboardTotalCommand(dto, Actor.System(AppConstants.Service.Report));
        await sender.Send(command, context.CancellationToken);

        return new PutDashboardTotalResponse { Success = true };
    }

    public override async Task<PutOrderGrowthLineChartResponse> PutOrderGrowthLineChart(PutOrderGrowthLineChartRequest request, ServerCallContext context)
    {
        var items = request.Items.Select(item => new UpdateOrderGrowthLineChartDto
        {
            Day = item.Day,
            Value = item.Value,
            Date = item.Date?.ToDateTime() ?? DateTime.UtcNow
        }).ToList();

        var dto = new UpdateOrderGrowthLineChartListDto
        {
            Items = items
        };

        var command = new UpdateOrderGrowthLineChartCommand(dto, Actor.System(AppConstants.Service.Report));
        await sender.Send(command, context.CancellationToken);

        return new PutOrderGrowthLineChartResponse { Success = true };
    }

    public override async Task<PutTopProductPieChartResponse> PutTopProductPieChart(PutTopProductPieChartRequest request, ServerCallContext context)
    {
        var items = request.Items.Select(item => new UpdateTopProductPieChartDto
        {
            Name = item.Name,
            Value = item.Value
        }).ToList();

        var dto = new UpdateTopProductPieChartListDto
        {
            Items = items
        };

        var command = new UpdateTopProductPieChartCommand(dto, Actor.System(AppConstants.Service.Report));
        await sender.Send(command, context.CancellationToken);

        return new PutTopProductPieChartResponse { Success = true };
    }

    #endregion
}
