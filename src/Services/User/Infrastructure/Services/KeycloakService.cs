#region using

using User.Application.Dtos.Keycloaks;
using User.Application.Models.Responses;
using User.Infrastructure.ApiClients;
using Microsoft.Extensions.Configuration;
using SourceCommon.Configurations;
using User.Application.Services;

#endregion

namespace User.Infrastructure.Services;

public sealed class KeycloakService : IKeycloakService
{
    #region Fields, Properties and Indexers

    private readonly IKeycloakApi _keycloakApi;

    private readonly string _realm;

    private readonly string _clientId;

    private readonly string _clientSecret;

    private readonly string _grantType;

    private readonly string[] _scopes;

    #endregion

    #region Ctors

    public KeycloakService(
        IKeycloakApi keycloakApi,
        IConfiguration cfg)
    {
        _keycloakApi = keycloakApi ?? throw new ArgumentNullException(nameof(keycloakApi));
        _realm = cfg[$"{KeycloakApiCfg.Section}:{KeycloakApiCfg.Realm}"]!;
        _clientId = cfg[$"{KeycloakApiCfg.Section}:{KeycloakApiCfg.ClientId}"]!;
        _clientSecret = cfg[$"{KeycloakApiCfg.Section}:{KeycloakApiCfg.ClientSecret}"]!;
        _grantType = cfg[$"{KeycloakApiCfg.Section}:{KeycloakApiCfg.GrantType}"]!;
        _scopes = cfg.GetRequiredSection($"{KeycloakApiCfg.Section}:{KeycloakApiCfg.Scopes}")
            .Get<string[]>() ?? throw new ArgumentNullException($"{KeycloakApiCfg.Section}:{KeycloakApiCfg.Scopes}");
    }

    #endregion

    #region Implementations

    public async Task<string> CreateUserAsync(KcUserDto user)
    {
        var accessToken = await GetAccessTokenAsync();

        var result = await _keycloakApi.CreateUserAsync(
            _realm,
            user,
            $"Bearer {accessToken.AccessToken}");

        return result.Content!;
    }

    public async Task<string> DeleteUserAsync(string userId)
    {
        var accessToken = await GetAccessTokenAsync();

        var result = await _keycloakApi.DeleteUserAsync(
            _realm,
            userId,
            $"Bearer {accessToken.AccessToken}");

        return result.Content!;
    }

    public async Task<string> UpdateUserAsync(string userId, KcUserDto user)
    {
        var accessToken = await GetAccessTokenAsync();

        var result = await _keycloakApi.UpdateUserAsync(
            _realm,
            userId,
            user,
            $"Bearer {accessToken.AccessToken}");

        return result.Content!;
    }

    #endregion

    #region Methods

    private async Task<KeycloakAccessTokenResponse> GetAccessTokenAsync()
    {
        var form = new Dictionary<string, string>
        {
            { "client_id", _clientId },
            { "client_secret", _clientSecret },
            { "grant_type", _grantType },
            { "scope", string.Join(" ", _scopes!) }
        };

        return await _keycloakApi.GetAccessTokenAsync(_realm, form);
    }

    #endregion
}
