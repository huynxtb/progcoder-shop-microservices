namespace App.Job.Models.Orders;

public sealed class OrderItemModel
{
    #region Fields, Properties and Indexers

    public string Id { get; set; } = string.Empty;

    public string ProductId { get; set; } = string.Empty;

    public string ProductName { get; set; } = string.Empty;

    public decimal ProductPrice { get; set; }

    public int Quantity { get; set; }

    #endregion
}
