#region using

using Domain.Abstractions;

#endregion

namespace Domain.Entities;

public sealed class Role : Entity<Guid>
{
    #region Fields, Properties and Indexers

    public string? Name { get; private set; }

    public string? KeycloakRoleId { get; private set; }

    public ICollection<UserRole>? UserRoles { get; }

    #endregion

    #region Ctors

    private Role()
    {
    }

    #endregion

    #region Methods

    public static Role Create(
        string name,
        string keycloakRoleId)
    {
        return new Role
        {
            Id = Guid.NewGuid(),
            Name = name,
            KeycloakRoleId = keycloakRoleId
        };
    }

    #endregion
}
