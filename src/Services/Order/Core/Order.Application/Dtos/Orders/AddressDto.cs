namespace Order.Application.Dtos.Orders;

public class AddressDto
{
    #region Fields, Properties and Indexers

    public string FirstName { get; set; } = default!;

    public string LastName { get; set; } = default!;

    public string? EmailAddress { get; set; }

    public string AddressLine { get; set; } = default!;

    public string Country { get; set; } = default!;

    public string State { get; set; } = default!;

    public string ZipCode { get; } = default!;

    #endregion
}
