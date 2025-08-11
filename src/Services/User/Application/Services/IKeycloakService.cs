#region using

using Application.Dtos.Keycloaks;

#endregion

namespace Application.Services;

public interface IKeycloakService
{
    #region Methods

    Task<string> CreateUserAsync(KcUserDto user);

    Task<string> UpdateUserAsync(string userId, KcUserDto user);

    Task<string> DeleteUserAsync(string userId);

    #endregion
}
