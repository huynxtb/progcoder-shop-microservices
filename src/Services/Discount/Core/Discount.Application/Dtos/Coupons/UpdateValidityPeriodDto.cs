#region using

#endregion

namespace Discount.Application.Dtos.Coupons;

public sealed class UpdateValidityPeriodDto
{
    #region Fields, Properties and Indexers

    public DateTime ValidFrom { get; init; }

    public DateTime ValidTo { get; init; }

    #endregion
}

