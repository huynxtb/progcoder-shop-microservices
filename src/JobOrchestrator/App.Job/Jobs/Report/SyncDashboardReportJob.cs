#region using

using App.Job.ApiClients;
using App.Job.Attributes;
using Common.Configurations;
using Quartz;
using static IdentityModel.OidcConstants;

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
    IConfiguration cfg) : IJob
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
        // TODO: Implement order statistics sync
        // Example: Call Order service to get aggregated order data
        await Task.Delay(100, cancellationToken);
        logger.LogInformation("Order statistics synced successfully");
    }

    private async Task SyncProductStatisticsAsync(CancellationToken cancellationToken)
    {
        // TODO: Implement product statistics sync
        // Example: Call Catalog service to get product performance data
        await Task.Delay(100, cancellationToken);
        logger.LogInformation("Product statistics synced successfully");
    }

    private async Task SyncDashboardCardAsync(CancellationToken cancellationToken)
    {
        
        logger.LogInformation("Dashboard cache updated successfully");
    }

    private async Task<long> GetUsersCountAsync()
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

    #endregion
}
