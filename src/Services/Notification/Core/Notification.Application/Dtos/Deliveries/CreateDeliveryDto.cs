#region using

using Notification.Domain.Enums;

#endregion

namespace Notification.Application.Dtos.Deliveries;

public sealed class CreateDeliveryDto
{
    #region Fields, Properties and Indexers

    public string EventId { get; set; } = string.Empty;

    public string TemplateKey { get; set; } = string.Empty;

    public ChannelType ChannelType { get; set; }

    public List<string> To { get; set; } = [];

    public Dictionary<string, object>? TemplateVariables { get; set; }

    public DeliveryPriority Priority { get; set; } = DeliveryPriority.Medium;

    public List<string>? Cc { get; set; }

    public List<string>? Bcc { get; set; }

    public int MaxAttempts { get; set; } = AppConstants.MaxAttempts;

    public string? TargetUrl { get; set; }

    #endregion
}

