namespace Discount.Api.Constants;

public sealed class ApiRoutes
{
    public static class Basket
    {
        #region Constants

        public const string Tags = "Baskets";

        private const string Base = "/basket";

        public const string GetBasket = $"{Base}";

        public const string StoreBasket = $"{Base}";

        public const string DeleteBasket = $"{Base}";

        public const string CheckoutBasket = $"{Base}/checkout";

        #endregion
    }

    public static class Coupon
    {
        #region Constants

        public const string Tags = "Coupons";

        private const string BaseAdmin = "/admin/coupons";

        private const string Base = "/coupons";

        public const string CreateCoupon = $"{BaseAdmin}";

        public const string UpdateCoupon = $"{BaseAdmin}/{{id}}";

        public const string DeleteCoupon = $"{BaseAdmin}/{{id}}";

        public const string ApproveCoupon = $"{BaseAdmin}/{{id}}/approve";

        public const string RejectCoupon = $"{BaseAdmin}/{{id}}/reject";

        public const string GetCoupon = $"{BaseAdmin}/{{id}}";

        public const string GetCoupons = $"{BaseAdmin}";

        public const string GetAlloupons = $"{BaseAdmin}/all";

        public const string GetCouponsApproved = $"{BaseAdmin}/approved";

        public const string UpdateValidityPeriod = $"{BaseAdmin}/{{id}}/validity-period";

        public const string GetCouponByCode = $"{Base}/code/{{code}}";

        public const string EvaluateCoupon = $"{Base}/evaluate";

        #endregion
    }
}
