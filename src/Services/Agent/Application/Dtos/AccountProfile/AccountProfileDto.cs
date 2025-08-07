namespace Application.Dtos.AccountProfile;

public class AccountProfileDto
{
    #region Fields, Properties and Indexers

    public Guid KeycloakUserNo { get; set; }

    public string? Bio { get; set; }

    public DateOnly? Birthday { get; set; }

    #endregion
}
