namespace Catalog.Api.Constants;

public sealed class ApiRoutes
{
    public static class Product
    {
        #region Constants

        public const string Tags = "Products";

        private const string Base = "/products";

        public const string Create = Base;

        #endregion
    }

    public static class Category
    {
        #region Constants

        public const string Tags = "Categories";

        private const string Base = "/categories";

        public const string GetAll = Base;

        #endregion
    }
}
