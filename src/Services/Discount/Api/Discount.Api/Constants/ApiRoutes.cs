namespace Discount.Api.Constants;

public sealed class ApiRoutes
{
    public static class Basket
    {
        #region Constants

        public const string Tags = "Baskets";

        private const string Base = "basket";

        public const string GetBasket = $"/{Base}";

        public const string StoreBasket = $"/{Base}";

        public const string DeleteBasket = $"/{Base}";

        public const string CheckoutBasket = $"/{Base}/checkout";

        #endregion
    }

    public static class Coupon
    {
        #region Constants

        public const string Tags = "Coupons";

        private const string Base = "coupons";

        public const string GetCoupon = $"/{Base}/{{id}}";

        public const string GetCouponByCode = $"/{Base}/code/{{code}}";

        public const string GetCoupons = $"/{Base}";

        public const string CreateCoupon = $"/{Base}";

        public const string UpdateCoupon = $"/{Base}/{{id}}";

        public const string DeleteCoupon = $"/{Base}/{{id}}";

        public const string ApproveCoupon = $"/{Base}/{{id}}/approve";

        public const string RejectCoupon = $"/{Base}/{{id}}/reject";

        public const string EvaluateCoupon = $"/{Base}/evaluate";

        #endregion
    }
}
