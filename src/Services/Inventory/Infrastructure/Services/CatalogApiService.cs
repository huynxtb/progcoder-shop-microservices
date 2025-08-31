#region using

using Inventory.Application.Dtos.Products;
using Inventory.Application.Models.Responses;
using Inventory.Application.Services;
using Inventory.Infrastructure.ApiClients;
using Microsoft.Extensions.Configuration;
using SourceCommon.Configurations;

#endregion

namespace Inventory.Infrastructure.Services;

public sealed class CatalogApiService : ICatalogApiService
{
    #region Fields, Properties and Indexers

    private readonly IKeycloakApi _keycloakApi;

    private readonly ICatalogApi _catalogApi;

    private readonly string _realm;

    private readonly string _clientId;

    private readonly string _clientSecret;

    private readonly string _grantType;

    private readonly string[] _scopes;

    #endregion

    #region Ctors

    public CatalogApiService(
        IKeycloakApi keycloakApi,
        ICatalogApi catalogApi,
        IConfiguration cfg)
    {
        _catalogApi = catalogApi ?? throw new ArgumentNullException(nameof(catalogApi));
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

    public async Task<ProductApiDto> GetProductByIdAsync(string productId)
    {
        var tokenResponse = await GetAccessTokenAsync();
        var response = await _catalogApi.GetProductByIdAsync(productId, tokenResponse.AccessToken!);
        return response;
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

