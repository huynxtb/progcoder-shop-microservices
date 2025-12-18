namespace Inventory.Api.Constants;

public sealed class ApiRoutes
{
    public static class InventoryItem
    {
        #region Constants

        public const string Tags = "Inventory Items";

        private const string Base = "/inventory-items";

        public const string GetInventoryItems = Base;

        public const string GetAllInventoryItems = $"{Base}/all";

        public const string Create = Base;

        public const string DecreaseStock = $"{Base}/{{inventoryItemId}}/stock/decrease";

        public const string IncreaseStock = $"{Base}/{{inventoryItemId}}/stock/increase";

        public const string Update = $"{Base}/{{inventoryItemId}}";

        public const string Delete = $"{Base}/{{inventoryItemId}}";

        #endregion
    }

    public static class Location
    {
        #region Constants

        public const string Tags = "Locations";

        private const string Base = "/locations";

        public const string GetAll = Base;

        public const string GetById = $"{Base}/{{locationId}}";

        public const string Create = Base;

        public const string Update = $"{Base}/{{locationId}}";

        public const string Delete = $"{Base}/{{locationId}}";

        #endregion
    }

    public static class History
    {
        #region Constants

        public const string Tags = "Inventory History";

        private const string Base = "/histories";

        public const string GetAll = Base;

        #endregion
    }
}
