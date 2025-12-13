#region using

using App.Job.Models.Keycloaks;
using Refit;

#endregion

namespace App.Job.ApiClients;

public interface IKeycloakApi
{
    #region Methods

    [Post("/realms/{realm}/protocol/openid-connect/token")]
    [Headers("Content-Type: application/x-www-form-urlencoded")]
    Task<KeycloakAccessToken> GetAccessTokenAsync(
        [AliasAs("realm")] string realm,
        [Body(BodySerializationMethod.UrlEncoded)] Dictionary<string, string> form);

    [Get("/admin/realms/{realm}/users/count")]
    Task<long> GetUsersCountAsync(
        [AliasAs("realm")] string realm,
        [Header("Authorization")] string bearerToken);

    #endregion
}