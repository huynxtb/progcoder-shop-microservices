namespace Notification.Application.Dtos.Keycloaks;

public class KeycloakUserDto
{
    #region Fields, Properties and Indexers

    public string Id { get; set; } = default!;

    public long CreatedTimestamp { get; set; }

    public string? Username { get; set; }

    public bool Enabled { get; set; }

    public bool Totp { get; set; }

    public bool EmailVerified { get; set; }

    public string? FirstName { get; set; }

    public string? LastName { get; set; }

    public string? Email { get; set; }

    public int NotBefore { get; set; }

    #endregion
}
