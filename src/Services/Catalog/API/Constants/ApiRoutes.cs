namespace Catalog.Api.Constants;

public sealed class ApiRoutes
{
    public static class Product
    {
        #region Constants

        public const string Tags = "Products";

        private const string Base = "/products";

        public const string Create = Base;

        public const string Delete = $"{Base}/{{productId}}";

        public const string Update = $"{Base}/{{productId}}";

        public const string Approve = $"{Base}/{{productId}}/approve";

        public const string Reject = $"{Base}/{{productId}}/reject";

        public const string SendToApproval = $"{Base}/{{productId}}/send-to-approval";

        #endregion
    }

    public static class Category
    {
        #region Constants

        public const string Tags = "Categories";

        private const string Base = "/categories";

        public const string GetAll = Base;

        public const string GetTree = $"{Base}/tree";

        #endregion
    }
}
