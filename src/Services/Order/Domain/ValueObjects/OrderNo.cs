#region using

using Order.Domain.Exceptions;

#endregion

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

    public static OrderNo Create(string value)
    {
        // validate: ORD-YYYYMMDD-00000
        if (string.IsNullOrWhiteSpace(value) ||
            !System.Text.RegularExpressions.Regex.IsMatch(
                value, @"^ORD-\d{8}-\d{5}$"))
            throw new DomainException("Invalid order number format.");
        return new OrderNo(value);
    }

    public override string ToString() => Value;

    #endregion
}
