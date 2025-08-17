#region using

using User.Application.Dtos.Keycloaks;

#endregion

namespace User.Application.Services;

public interface IKeycloakService
{
    #region Methods

    Task<string> CreateUserAsync(KcUserDto user);

    Task<string> UpdateUserAsync(string userId, KcUserDto user);

    Task<string> DeleteUserAsync(string userId);

    #endregion
}
