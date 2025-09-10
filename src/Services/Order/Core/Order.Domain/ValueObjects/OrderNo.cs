namespace Order.Domain.ValueObjects;

public class OrderNo
{
    #region Fields, Properties and Indexers

    public string Value { get; }

    #endregion

    #region Ctors

    private OrderNo(string value) => Value = value;

    #endregion

    #region Methods

    public static OrderNo Create()
    {
        var dateString = DateTimeOffset.Now.ToString("yyyyMMdd");
        var sequenceString = Guid.NewGuid().ToString().Split("-").First();
        var orderNumber = $"ORD-{dateString}-{sequenceString}";
        return new OrderNo(orderNumber);
    }

    public override string ToString() => Value;

    #endregion
}