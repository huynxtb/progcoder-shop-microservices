namespace Order.Application.Dtos.ValueObjects;

public class AddressDto
{
    #region Fields, Properties and Indexers

    public string AddressLine { get; set; } = default!;

    public string Subdivision { get; set; } = default!;

    public string City { get; set; } = default!;

    public string StateOrProvince { get; set; } = default!;

    public string Country { get; set; } = default!;

    public string PostalCode { get; set; } = default!;

    #endregion
}
