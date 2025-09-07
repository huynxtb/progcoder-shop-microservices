namespace Order.Domain.Enums;

public enum OrderStatus
{
    #region Fields, Properties and Indexers

    Pending = 1,
    PendingPayment = 2,
    Paid = 3,
    PaymentFailed = 4,
    Cancelled = 5

    #endregion
}
