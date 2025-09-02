namespace Common.Models.Identity;

public sealed class UserIdentity
{
    #region Fields, Properties and Indexers

    public string Id { get; init; } = default!;

    public string UserName { get; init; } = default!;

    public string FirstName { get; init; } = default!;

    public string LastName { get; init; } = default!;

    public string? MiddleName { get; init; }

    public string Email { get; init; } = default!;

    public bool EmailVerified { get; init; }

    public string? Tenant { get; init; }

    public List<string>? Roles { get; init; }

    #endregion

    #region Methods

    public bool HasRoles(string roleName)
    {
        return Roles != null && Roles.Any(role => role == roleName);
    }

    #endregion
}
