namespace Order.Api.Constants;

public sealed class ApiRoutes
{
    public static class Order
    {
        #region Constants

        public const string Tags = "Orders";

        private const string Base = "orders";

        public const string Create = $"/{Base}";

        public const string Update = $"/{Base}/{{orderId}}";

        public const string GetOrders = $"/{Base}";
        
        public const string GetAllOrders = $"/{Base}/all";
        
        public const string GetOrdersByCurrentUser = $"/{Base}/my-orders";
        
        public const string GetOrderById = $"/{Base}/{{orderId}}";
        
        public const string GetOrderByOrderNo = $"/{Base}/by-order-no/{{orderNo}}";

        #endregion
    }
}
