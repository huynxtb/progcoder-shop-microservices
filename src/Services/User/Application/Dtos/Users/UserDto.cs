#region using

using Application.Dtos.Abstractions;

#endregion

namespace Application.Dtos.Users;

public class UserDto : BaseDto<Guid>
{
    #region Fields, Properties and Indexers

    public string? UserName { get; set; }

    public string? Email { get; set; }

    public string? FirstName { get; set; }

    public string? LastName { get; set; }

    public string? KeycloakUserId { get; set; }

    #endregion
}
