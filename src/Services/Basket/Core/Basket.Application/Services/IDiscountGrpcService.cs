#region using

using Basket.Application.Models.Responses.Externals;

#endregion

namespace Basket.Application.Services;

public interface IDiscountGrpcService
{
    #region Methods

    Task<EvaluateCouponResponse?> EvaluateCouponAsync(string code, decimal amount, CancellationToken cancellationToken = default);

    #endregion
}
