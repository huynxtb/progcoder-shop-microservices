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

        public const string Unpublish = $"{Base}/{{productId}}/unpublish";

        public const string Publish = $"{Base}/{{productId}}/publish";

        public const string GetProductById = $"{Base}/{{productId}}";

        public const string GetPublishProductById = $"{Base}/{{productId}}/public";

        public const string GetProducts = Base;

        public const string GetPublishProducts = $"{Base}/public";

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
