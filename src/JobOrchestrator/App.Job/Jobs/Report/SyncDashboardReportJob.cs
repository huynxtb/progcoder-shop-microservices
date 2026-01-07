#region using

using App.Job.ApiClients;
using App.Job.Attributes;
using App.Job.Enums;
using App.Job.Models.Orders;
using Catalog.Grpc;
using Common.Configurations;
using Common.Extensions;
using Google.Protobuf.WellKnownTypes;
using Order.Grpc;
using Quartz;
using Report.Grpc;

#endregion

namespace App.Job.Jobs.Report;

[Job(
    JobName = "SyncDashboardReport",
    JobGroup = "Report",
    Description = "Synchronizes dashboard report data from multiple sources",
    CronExpression = "0 0/1 * * * ?", // Runs every 1 minutes
    AutoStart = true)]
public class SyncDashboardReportJob(ILogger<SyncDashboardReportJob> logger,
    IKeycloakApi keycloak,
    IConfiguration cfg,
    ReportGrpc.ReportGrpcClient reportGrpc,
    OrderGrpc.OrderGrpcClient orderGrpc,
    CatalogGrpc.CatalogGrpcClient catalogGrpc) : IJob
{
    #region Implementations

    public async Task Execute(IJobExecutionContext context)
    {
        var jobKey = context.JobDetail.Key;

        logger.LogInformation(
            "Job {JobName} started at {StartTime}",
            jobKey.Name,
            DateTimeOffset.Now);

        try
        {
            logger.LogInformation("Fetching order statistics...");
            await SyncOrderStatisticsAsync(context.CancellationToken);

            logger.LogInformation("Fetching product statistics...");
            await SyncProductStatisticsAsync(context.CancellationToken);

            logger.LogInformation("Fetching dashboard card...");
            await SyncDashboardCardAsync(context.CancellationToken);

            logger.LogInformation("Job {JobName} completed successfully at {EndTime}", jobKey.Name, DateTimeOffset.Now);
        }
        catch (OperationCanceledException)
        {
            logger.LogWarning("Job {JobName} was cancelled", jobKey.Name);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Job {JobName} failed with error", jobKey.Name);
        }
    }

    #endregion

    #region Private Methods

    private async Task SyncOrderStatisticsAsync(CancellationToken cancellationToken)
    {
        var orders = await GetOrdersByMonthAsync(cancellationToken);

        // Group orders by day and calculate statistics
        var dailyStats = orders
            .GroupBy(o => o.OrderDate.Day)
            .Select(g => new OrderGrowthLineChartItem
            {
                Day = g.Key,
                Value = g.Sum(o => (double)o.FinalPrice),
                Date = Timestamp.FromDateTime(new DateTime(
                    DateTime.UtcNow.Year,
                    DateTime.UtcNow.Month,
                    g.Key, 0, 0, 0, DateTimeKind.Utc))
            })
            .ToList();

        // Call Report gRPC
        await reportGrpc.PutOrderGrowthLineChartAsync(
            new PutOrderGrowthLineChartRequest { Items = { dailyStats } },
            cancellationToken: cancellationToken);

        logger.LogInformation("Order statistics synced successfully");
    }

    private async Task SyncProductStatisticsAsync(CancellationToken cancellationToken)
    {
        var orders = await GetAllOrdersÁync(cancellationToken);

        // Calculate top products by total quantity sold
        var topProducts = orders
            .SelectMany(o => o.OrderItems)
            .GroupBy(item => new { item.ProductId, item.ProductName })
            .Select(g => new TopProductPieChartItem
            {
                Name = g.Key.ProductName,
                Value = g.Sum(item => item.Quantity)
            })
            .OrderByDescending(x => x.Value)
            .Take(10)
            .ToList();

        // Call Report gRPC
        await reportGrpc.PutTopProductPieChartAsync(
            new PutTopProductPieChartRequest { Items = { topProducts } },
            cancellationToken: cancellationToken);

        logger.LogInformation("Product statistics synced successfully");
    }

    private async Task SyncDashboardCardAsync(CancellationToken cancellationToken)
    {
        var orders = await GetOrdersByMonthAsync(cancellationToken);
        var usersCount = await GetUsersCountAsync(cancellationToken);
        var productsCount = await GetCountProductAsync(cancellationToken);

        // Calculate statistics
        var totalOrders = orders.Count;
        var totalRevenue = orders.Sum(o => o.FinalPrice);

        // Call Report gRPC to update 4 cards
        await reportGrpc.PutDashboardTotalAsync(new PutDashboardTotalRequest
        {
            Title = DashboardTotalTitle.TotalOrders.GetDescription(),
            Count = totalOrders.ToString()
        }, cancellationToken: cancellationToken);

        await reportGrpc.PutDashboardTotalAsync(new PutDashboardTotalRequest
        {
            Title = DashboardTotalTitle.TotalUsers.GetDescription(),
            Count = usersCount.ToString()
        }, cancellationToken: cancellationToken);

        await reportGrpc.PutDashboardTotalAsync(new PutDashboardTotalRequest
        {
            Title = DashboardTotalTitle.TotalProducts.GetDescription(),
            Count = productsCount.ToString()
        }, cancellationToken: cancellationToken);

        await reportGrpc.PutDashboardTotalAsync(new PutDashboardTotalRequest
        {
            Title = DashboardTotalTitle.TotalRevenue.GetDescription(),
            Count = totalRevenue.ToString("N0")
        }, cancellationToken: cancellationToken);

        logger.LogInformation("Dashboard updated successfully");
    }

    private async Task<long> GetUsersCountAsync(CancellationToken cancellationToken)
    {
        var realm = cfg[$"{ApiClientCfg.Keycloak.Section}:{ApiClientCfg.Keycloak.Realm}"]!;
        var form = new Dictionary<string, string>
        {
            { "client_id", cfg[$"{ApiClientCfg.Keycloak.Section}:{ApiClientCfg.Keycloak.ClientId}"]! },
            { "client_secret", cfg[$"{ApiClientCfg.Keycloak.Section}:{ApiClientCfg.Keycloak.ClientSecret}"]! },
            { "grant_type", cfg[$"{ApiClientCfg.Keycloak.Section}:{ApiClientCfg.Keycloak.GrantType}"]! },
            { "scope", string.Join(" ", cfg.GetRequiredSection($"{ApiClientCfg.Keycloak.Section}:{ApiClientCfg.Keycloak.Scopes}").Get<string[]>()!) }
        };

        var accessToken = await keycloak.GetAccessTokenAsync(realm, form);
        var count = await keycloak.GetUsersCountAsync(realm, $"Bearer {accessToken.AccessToken}");

        return count;
    }

    private async Task<long> GetCountProductAsync(CancellationToken cancellationToken)
    {
        var result = await catalogGrpc.GetCountProductAsync(
                new GetCountProductRequest { },
                cancellationToken: cancellationToken);
        return result.Count;
    }

    private async Task<List<OrderModel>> GetOrdersByMonthAsync(CancellationToken cancellationToken)
    {
        var now = DateTime.UtcNow;
        var result = await orderGrpc.GetOrdersByMonthAsync(
                new GetOrdersByMonthRequest { Year = now.Year, Month = now.Month },
                cancellationToken: cancellationToken);

        var orders = result.Orders.Select(order => new OrderModel
        {
            Id = order.Id,
            OrderDate = order.CreatedOnUtc?.ToDateTime() ?? DateTime.UtcNow,
            TotalPrice = (decimal)order.TotalPrice,
            FinalPrice = (decimal)order.FinalPrice,
            OrderItems = order.OrderItems.Select(item => new OrderItemModel
            {
                ProductId = item.Product.Id,
                ProductName = item.Product.Name,
                ProductPrice = (decimal)item.Product.Price,
                Quantity = item.Quantity
            }).ToList()
        }).ToList();

        return orders;
    }

    private async Task<List<OrderModel>> GetAllOrdersÁync(CancellationToken cancellationToken)
    {
        var now = DateTime.UtcNow;
        var result = await orderGrpc.GetAllOrdersAsync(
                new GetAllOrdersRequest { },
                cancellationToken: cancellationToken);

        var orders = result.Orders.Select(order => new OrderModel
        {
            Id = order.Id,
            OrderDate = order.CreatedOnUtc?.ToDateTime() ?? DateTime.UtcNow,
            TotalPrice = (decimal)order.TotalPrice,
            FinalPrice = (decimal)order.FinalPrice,
            OrderItems = order.OrderItems.Select(item => new OrderItemModel
            {
                ProductId = item.Product.Id,
                ProductName = item.Product.Name,
                ProductPrice = (decimal)item.Product.Price,
                Quantity = item.Quantity
            }).ToList()
        }).ToList();

        return orders;
    }

    #endregion
}
