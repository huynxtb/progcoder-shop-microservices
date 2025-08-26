namespace User.Application.Dtos.Keycloaks;

public class KcUserEventDto
{
    #region Fields, Properties and Indexers

    public string? Action { get; init; }

    public string? RealmId { get; init; }

    public string? RealmName { get; init; }

    public string? Id { get; init; }

    public string? Username { get; init; }

    public string? Email { get; init; }

    public bool EmailVerified { get; init; }

    public bool Enabled { get; init; }

    public long CreatedTimestamp { get; init; }

    public string? IpAddress { get; set; }

    public List<string>? Roles { get; init; }

    public List<KcUserAttrDto>? Attributes { get; init; }

    public List<string>? Groups { get; init; }

    #endregion
}
