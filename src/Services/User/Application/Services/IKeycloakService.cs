using Application.Models;

namespace Application.Services;

public interface IKeycloakService
{
    #region Methods

    Task<string> CreateUserAsync(KeycloakUserDto user);

    #endregion
}
