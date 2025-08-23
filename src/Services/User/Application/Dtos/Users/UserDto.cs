#region using

using User.Application.Dtos.Abstractions;

#endregion

namespace User.Application.Dtos.Users;

public class UserDto : EntityDto<Guid>
{
    #region Fields, Properties and Indexers

    public string? UserName { get; set; }

    public string? Email { get; set; }

    public string? PhoneNumber { get; set; }

    public string? FirstName { get; set; }

    public string? LastName { get; set; }

    public bool EmailVerified { get; set; }

    public bool IsActive { get; set; }

    #endregion
}
