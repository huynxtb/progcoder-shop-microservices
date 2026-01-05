#region using

using Notification.Application.Dtos.Keycloaks;
using Notification.Application.Services;

#endregion

namespace Notification.Application.Features.Keycloak.Queries;

public sealed record GetKeycloakUsersQuery() : IQuery<List<KeycloakUserDto>>;

public sealed class GetKeycloakUsersQueryHandler(
    IKeycloakService keycloakService)
    : IQueryHandler<GetKeycloakUsersQuery, List<KeycloakUserDto>>
{
    #region Implementations

    public async Task<List<KeycloakUserDto>> Handle(GetKeycloakUsersQuery query, CancellationToken cancellationToken)
    {
        return await keycloakService.GetUsersAsync(cancellationToken);
    }

    #endregion
}

