#region using

using AutoMapper;
using Microsoft.Extensions.Configuration;
using Notification.Application.Dtos.Keycloaks;
using Notification.Application.Services;
using Notification.Domain.Models.Externals.Keycloaks;
using Notification.Infrastructure.ApiClients;

#endregion

namespace Notification.Infrastructure.Services;

public sealed class KeycloakService(
    IKeycloakApi keycloakApi,
    IConfiguration cfg,
    IMapper mapper) : IKeycloakService
{
    #region Implementations

    public async Task<List<KeycloakUserDto>> GetUsersAsync(CancellationToken cancellationToken = default)
    {
        var accessToken = await GetAccessTokenAsync(cancellationToken);
        var realm = cfg[$"{KeycloakApiCfg.Section}:{KeycloakApiCfg.Realm}"]!;

        var result = await keycloakApi.GetUsersAsync(
            realm: realm,
            bearerToken: $"Bearer {accessToken.AccessToken}");

        return mapper.Map<List<KeycloakUserDto>>(result);
    }

    public async Task<List<KeycloakUserDto>> GetUsersByRoleAsync(string role, CancellationToken cancellationToken = default)
    {
        var accessToken = await GetAccessTokenAsync(cancellationToken);
        var realm = cfg[$"{KeycloakApiCfg.Section}:{KeycloakApiCfg.Realm}"]!;

        var result = await keycloakApi.GetUsersByRoleAsync(
            realm: realm,
            role: role,
            bearerToken: $"Bearer {accessToken.AccessToken}");

        return mapper.Map<List<KeycloakUserDto>>(result);
    }

    #endregion

    #region Methods

    private async Task<KeycloakAccessToken> GetAccessTokenAsync(CancellationToken cancellationToken)
    {
        var realm = cfg[$"{KeycloakApiCfg.Section}:{KeycloakApiCfg.Realm}"]!;
        var clientId = cfg[$"{KeycloakApiCfg.Section}:{KeycloakApiCfg.ClientId}"]!;
        var clientSecret = cfg[$"{KeycloakApiCfg.Section}:{KeycloakApiCfg.ClientSecret}"]!;
        var grantType = cfg[$"{KeycloakApiCfg.Section}:{KeycloakApiCfg.GrantType}"]!;
        var scopes = cfg.GetRequiredSection($"{KeycloakApiCfg.Section}:{KeycloakApiCfg.Scopes}")
            .Get<string[]>() ?? throw new ArgumentNullException($"{KeycloakApiCfg.Section}:{KeycloakApiCfg.Scopes}");

        var form = new Dictionary<string, string>
        {
            { "client_id", clientId },
            { "client_secret", clientSecret },
            { "grant_type", grantType },
            { "scope", string.Join(" ", scopes) }
        };

        return await keycloakApi.GetAccessTokenAsync(realm, form);
    }

    #endregion
}

