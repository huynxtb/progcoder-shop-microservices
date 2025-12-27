namespace Order.Application.Dtos.ValueObjects;

public class AddressDto
{
    #region Fields, Properties and Indexers

    public string AddressLine { get; set; } = default!;

    public string Ward { get; set; } = default!;

    public string District { get; set; } = default!;

    public string City { get; set; } = default!;

    public string Country { get; set; } = default!;

    public string State { get; set; } = default!;

    public string ZipCode { get; set; } = default!;

    #endregion
}
