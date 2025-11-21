namespace Notification.Application.Dtos.Keycloaks;

public sealed class KeycloakAccessTokenDto
{
    #region Fields, Properties and Indexers

    public string AccessToken { get; set; } = default!;

    public int ExpiresIn { get; set; }

    public int RefreshExpiresIn { get; set; }

    public string? TokenType { get; set; }

    public string? IdToken { get; set; }

    public int NotBeforePolicy { get; set; }

    public string? Scope { get; set; }

    #endregion
}
