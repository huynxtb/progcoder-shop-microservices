namespace Notification.Domain.Enums;

public enum DeliveryStatus
{
    Queued = 1,
    Sent = 2,
    Failed = 3,
    Sending = 4,
    Illegal = 5,
    GiveUp = 6,
}
