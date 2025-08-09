#region using

using Application.Dtos.Keycloaks;
using Application.Models.Responses;
using Application.Services;
using Infrastructure.ApiClients;
using JasperFx.Core;
using Microsoft.Extensions.Configuration;
using SourceCommon.Configurations;

#endregion

namespace Infrastructure.Services;

public class KeycloakService : IKeycloakService
{
    #region Fields, Properties and Indexers

    private readonly IKeycloakApi _keycloakApi;

    private readonly IConfiguration _cfg;

    private readonly string _baseUrl;

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
        _cfg = cfg ?? throw new ArgumentNullException(nameof(cfg));

        _baseUrl = cfg[$"{KeycloakApiCfg.Section}:{KeycloakApiCfg.BaseUrl}"]!;
        _realm = cfg[$"{KeycloakApiCfg.Section}:{KeycloakApiCfg.Realm}"]!;
        _clientId = cfg[$"{KeycloakApiCfg.Section}:{KeycloakApiCfg.ClientId}"]!;
        _clientSecret = cfg[$"{KeycloakApiCfg.Section}:{KeycloakApiCfg.ClientSecret}"]!;
        _grantType = cfg[$"{KeycloakApiCfg.Section}:{KeycloakApiCfg.GrantType}"]!;
        _scopes = cfg.GetRequiredSection($"{KeycloakApiCfg.Section}:{KeycloakApiCfg.Scopes}")
            .Get<string[]>() ?? throw new ArgumentNullException($"{KeycloakApiCfg.Section}:{KeycloakApiCfg.Scopes}");
    }

    #endregion

    #region Implementations

    public async Task<string> CreateUserAsync(KeycloakUserDto user)
    {
        var accessToken = await GetAccessTokenAsync();

        var result = await _keycloakApi.CreateUserAsync(
            _realm,
            user,
            $"Bearer {accessToken.AccessToken}");

        return result.Content!;
    }

    private async Task<KeycloakAccessTokenResponse> GetAccessTokenAsync()
    {
        var form = new Dictionary<string, string>
        {
            { "client_id", _clientId },
            { "client_secret", _clientSecret },
            { "grant_type", _grantType },
            { "scope", _scopes!.Join(" ") }
        };

        return await _keycloakApi.GetAccessTokenAsync(_realm, form);
    }

    #endregion
}
