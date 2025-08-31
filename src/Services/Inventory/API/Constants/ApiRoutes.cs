namespace Inventory.Api.Constants;

public sealed class ApiRoutes
{
    public static class InventoryItem
    {
        #region Constants

        public const string Tags = "Inventory Items";

        private const string Base = "/inventory-items";

        public const string GetInventoryItems = Base;

        public const string Create = Base;

        public const string UpdateStock = $"{Base}/{{inventoryItemId}}";

        public const string Delete = $"{Base}/{{inventoryItemId}}";

        #endregion
    }
}
