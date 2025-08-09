namespace Application.Dtos.Users;

public sealed class CreateUserDto
{
    #region Fields, Properties and Indexers

    public string? UserName { get; set; }

    public string? Email { get; set; }

    public string? FirstName { get; set; }

    public string? LastName { get; set; }

    public string? Password { get; set; }

    public string? ConfirmPassword { get; set; }

    public string? KeycloakUserId { get; set; }

    #endregion
}
