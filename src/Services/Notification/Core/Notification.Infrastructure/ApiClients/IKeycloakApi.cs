#region using

using Notification.Domain.Models.Externals.Keycloaks;
using Refit;

#endregion

namespace Notification.Infrastructure.ApiClients;

public interface IKeycloakApi
{
    #region Methods

    [Post("/realms/{realm}/protocol/openid-connect/token")]
    [Headers("Content-Type: application/x-www-form-urlencoded")]
    Task<KeycloakAccessTokenResponse> GetAccessTokenAsync(
        [AliasAs("realm")] string realm,
        [Body(BodySerializationMethod.UrlEncoded)] Dictionary<string, string> form);

    [Get("/admin/realms/{realm}/users")]
    Task<List<KeycloakUserResponse>> GetUsersAsync(
        [AliasAs("realm")] string realm,
        [Header("Authorization")] string bearerToken);

    [Get("/admin/realms/{realm}/roles/{role}/users")]
    Task<List<KeycloakUserResponse>> GetUsersByRoleAsync(
        [AliasAs("realm")] string realm,
        [AliasAs("role")] string role,
        [Header("Authorization")] string bearerToken);

    #endregion
}