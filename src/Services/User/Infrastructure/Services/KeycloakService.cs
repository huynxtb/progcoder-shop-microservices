#region using

using Application.Models;
using Application.Services;
using Infrastructure.ApiClients;

#endregion

namespace Infrastructure.Services;

public class KeycloakService(
    IKeycloakApi api) : IKeycloakService
{
    #region Implementations

    public async Task<string> CreateUserAsync(KeycloakUserDto user)
    {
        //var accessToken = await api.GetAccessTokenAsync();

        throw new NotImplementedException();
    }

    #endregion
}
