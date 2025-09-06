#region using

using Order.Application.Dtos.Products;
using Order.Application.Models.Responses;
using Order.Application.Services;
using Order.Infrastructure.ApiClients;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Refit;
using Common.Configurations;
using Common.Models.Reponses;

#endregion

namespace Order.Infrastructure.Services;

public sealed class CatalogApiService : ICatalogApiService
{
    #region Fields, Properties and Indexers

    private readonly IKeycloakApi _keycloakApi;

    private readonly ICatalogApi _catalogApi;

    private readonly ILogger<CatalogApiService> _logger;

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
        ILogger<CatalogApiService> logger,
        IConfiguration cfg)
    {
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
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

    public async Task<ResultSharedResponse<ProductApiDto>?> GetProductByIdAsync(string productId)
    {
        try
        {
            var tokenResponse = await GetAccessTokenAsync();
            var response = await _catalogApi.GetProductByIdAsync(productId, $"Bearer {tokenResponse.AccessToken}");
            return response;
        }
        catch (ApiException ex)
        {
            _logger.LogWarning(ex, "Error calling Catalog API for productId: {ProductId}", productId);
            return null;
        }
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

