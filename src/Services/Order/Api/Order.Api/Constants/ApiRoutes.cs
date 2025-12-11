namespace Order.Api.Constants;

public sealed class ApiRoutes
{
    public static class Order
    {
        #region Constants

        public const string Tags = "Orders";

        private const string Base = "/orders";

        private const string BaseAdmin = "/admin/orders";

        public const string Create = $"{BaseAdmin}";

        public const string Update = $"{BaseAdmin}/{{orderId}}";

        public const string GetOrders = $"{BaseAdmin}";
        
        public const string GetAllOrders = $"{BaseAdmin}/all";
        
        public const string GetOrderById = $"{BaseAdmin}/{{orderId}}";
        
        public const string UpdateOrderStatus = $"{BaseAdmin}/{{orderId}}/status";

        public const string GetOrderByOrderNo = $"{Base}/order-no/{{orderNo}}";

        public const string GetOrdersByCurrentUser = $"{Base}/me";

        #endregion
    }
}
