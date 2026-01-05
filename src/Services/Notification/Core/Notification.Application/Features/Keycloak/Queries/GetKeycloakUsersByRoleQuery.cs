#region using

using Notification.Application.Dtos.Keycloaks;
using Notification.Application.Services;

#endregion

namespace Notification.Application.Features.Keycloak.Queries;

public sealed record GetKeycloakUsersByRoleQuery(string Role) : IQuery<List<KeycloakUserDto>>;

public sealed class GetKeycloakUsersByRoleQueryHandler(
    IKeycloakService keycloakService)
    : IQueryHandler<GetKeycloakUsersByRoleQuery, List<KeycloakUserDto>>
{
    #region Implementations

    public async Task<List<KeycloakUserDto>> Handle(GetKeycloakUsersByRoleQuery query, CancellationToken cancellationToken)
    {
        return await keycloakService.GetUsersByRoleAsync(query.Role, cancellationToken);
    }

    #endregion
}

