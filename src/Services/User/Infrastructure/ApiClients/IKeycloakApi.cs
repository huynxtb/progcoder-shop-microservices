#region using

using Application.Models;
using Application.Models.Response;
using Refit;

#endregion

namespace Infrastructure.ApiClients;

public interface IKeycloakApi
{
    #region Methods

    [Post("/realms/{realm}/protocol/openid-connect/token")]
    [Headers("Content-Type: application/x-www-form-urlencoded")]
    Task<AccessTokenResponse> GetAccessTokenAsync(
        [AliasAs("realm")] string realm,
        [Body(BodySerializationMethod.UrlEncoded)] Dictionary<string, string> form);

    [Get("/admin/realms/{realm}/users")]
    Task<List<KeycloakUserResponse>> GetUsersAsync(
        [AliasAs("realm")] string realm,
        [Header("Authorization")] string bearerToken);

    [Get("/admin/realms/{realm}/roles")]
    Task<List<KeycloakRoleResponse>> GetRolesAsync(
        [AliasAs("realm")] string realm,
        [Header("Authorization")] string bearerToken);

    [Get("/admin/realms/{realm}/groups")]
    Task<List<KeycloakGroupResponse>> GetGroupsAsync(
        [AliasAs("realm")] string realm,
        [Header("Authorization")] string bearerToken);

    [Post("/admin/realms/{realm}/users")]
    Task<ApiResponse<string>> CreateUserAsync(
        [AliasAs("realm")] string realm,
        [Body] KeycloakUserDto user,
        [Header("Authorization")] string bearerToken);

    [Put("/admin/realms/{realm}/users/{id}")]
    Task<ApiResponse<string>> UpdateUserAsync(
        [AliasAs("realm")] string realm,
        [AliasAs("id")] string userId,
        [Body] KeycloakUserDto user,
        [Header("Authorization")] string bearerToken);

    [Delete("/admin/realms/{realm}/users/{id}")]
    Task<ApiResponse<string>> DeleteUserAsync(
        [AliasAs("realm")] string realm,
        [AliasAs("id")] string userId,
        [Header("Authorization")] string bearerToken);

    [Post("/admin/realms/{realm}/users/{userId}/role-mappings/realm")]
    Task<ApiResponse<string>> AssignRolesToUserAsync(
        [AliasAs("realm")] string realm,
        [AliasAs("userId")] string userId,
        [Body] List<KeycloakRoleDto> roles,
        [Header("Authorization")] string bearerToken);

    [Post("/admin/realms/{realm}/users/{userId}/groups")]
    Task<ApiResponse<string>> AssignGroupsToUserAsync(
        [AliasAs("realm")] string realm,
        [AliasAs("userId")] string userId,
        [Body] List<KeycloakGroupDto> groups,
        [Header("Authorization")] string bearerToken);

    #endregion
}
