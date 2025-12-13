namespace App.Job.Models.Orders;

public class OrderModel
{
    #region Fields, Properties and Indexers

    public string Id { get; set; } = string.Empty;

    public DateTime OrderDate { get; set; }

    public decimal TotalPrice { get; set; }

    public decimal FinalPrice { get; set; }

    public List<OrderItemModel> OrderItems { get; set; } = default!;

    #endregion
}
