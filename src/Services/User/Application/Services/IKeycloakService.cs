#region using

using Application.Dtos.Keycloaks;

#endregion

namespace Application.Services;

public interface IKeycloakService
{
    #region Methods

    Task<string> CreateUserAsync(KeycloakUserDto user);

    #endregion
}
