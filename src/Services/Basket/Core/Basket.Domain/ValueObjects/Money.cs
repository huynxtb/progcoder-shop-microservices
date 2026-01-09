#region using

using Basket.Domain.Exceptions;

#endregion

namespace Basket.Domain.ValueObjects;

public sealed record Money(decimal Amount, string Currency)
{
    public static Money From(decimal amount, string currency)
    {
        if (amount < 0) throw new DomainException(MessageCode.MoneyCannotBeNegative);
        if (string.IsNullOrWhiteSpace(currency)) throw new DomainException(MessageCode.CurrencyIsRequired);
        return new Money(amount, currency.ToUpperInvariant());
    }
}
