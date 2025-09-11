namespace Order.Api.Constants;

public sealed class ApiRoutes
{
    public static class Order
    {
        #region Constants

        public const string Tags = "Orders";

        private const string Base = "orders";

        public const string Create = $"/{Base}";

        #endregion
    }
}
