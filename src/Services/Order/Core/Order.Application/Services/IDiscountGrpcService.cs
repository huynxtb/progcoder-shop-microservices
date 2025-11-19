#region using

using Order.Application.Models.Responses.Internals;

#endregion

namespace Order.Application.Services;

public interface IDiscountGrpcService
{
    #region Methods

    Task<ApplyCouponResponse?> ApplyCouponAsync(string code, decimal amount, CancellationToken cancellationToken = default);

    #endregion
}
