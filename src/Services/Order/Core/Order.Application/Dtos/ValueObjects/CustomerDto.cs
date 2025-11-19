namespace Order.Application.Dtos.ValueObjects;

public class CustomerDto
{
    #region Fields, Properties and Indexers

    public Guid? Id { get; set; }

    public string PhoneNumber { get; set; } = default!;

    public string Name { get; set; } = default!;

    public string Email { get; set; } = default!;

    #endregion
}
