namespace Domain.Entities;

public sealed class UserRole
{
	#region Fields, Properties and Indexers

	public Guid? RoleId { get; private set; }

	public Guid? UserId { get; private set; }

    public User? User { get; private set; }

    public Role? Role { get; private set; }

    #endregion

    #region Ctors

    private UserRole() { }

    public UserRole(Guid userId, Guid roleId)
    {
        UserId = userId;
        RoleId = roleId;
    }

    #endregion
}
