namespace Basket.Api.Constants;

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
}
