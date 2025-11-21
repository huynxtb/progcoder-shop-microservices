#region using

using Notification.Application.Dtos.Keycloaks;

#endregion

namespace Notification.Application.Services;

public interface IKeycloakService
{
    #region Methods

    Task<List<KeycloakUserDto>> GetUsersAsync(CancellationToken cancellationToken = default);

    Task<List<KeycloakUserDto>> GetUsersByRoleAsync(string role, CancellationToken cancellationToken = default);

    #endregion
}

