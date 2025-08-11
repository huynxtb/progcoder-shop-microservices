namespace SourceCommon.Models.Identity;

public sealed class UserIdentity
{
    #region Fields, Properties and Indexers

    public Guid Id { get; init; }

    public string? UserName { get; init; }

    public string? FirstName { get; init; }

    public string? LastName { get; init; }

    public string? MiddleName { get; init; }

    public string? Email { get; init; }

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
