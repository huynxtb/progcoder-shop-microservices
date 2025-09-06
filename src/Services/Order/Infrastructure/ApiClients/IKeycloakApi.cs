#region using

using Order.Application.Models.Responses;
using Refit;

#endregion

namespace Order.Infrastructure.ApiClients;

public interface IKeycloakApi
{
    #region Methods

    [Post("/realms/{realm}/protocol/openid-connect/token")]
    [Headers("Content-Type: application/x-www-form-urlencoded")]
    Task<KeycloakAccessTokenResponse> GetAccessTokenAsync(
        [AliasAs("realm")] string realm,
        [Body(BodySerializationMethod.UrlEncoded)] Dictionary<string, string> form);

    #endregion
}