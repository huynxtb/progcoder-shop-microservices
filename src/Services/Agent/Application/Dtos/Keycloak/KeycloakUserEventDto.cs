namespace Application.Dtos.Keycloak;

public class KeycloakUserEventDto
{
    #region Fields, Properties and Indexers

    public string? Action { get; init; }

    public string? RealmId { get; init; }

    public string? RealmName { get; init; }

    public string? Id { get; init; }

    public string? Username { get; init; }

    public string? Email { get; init; }

    public bool EmailVerified { get; init; }

    public long CreatedTimestamp { get; init; }

    public List<string>? Roles { get; init; }

    public List<KeycloakUserAttrDto>? Attributes { get; init; }

    public List<string>? Groups { get; init; }

    #endregion
}
