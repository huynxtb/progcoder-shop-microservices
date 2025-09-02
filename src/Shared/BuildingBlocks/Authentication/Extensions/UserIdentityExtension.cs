#region using

using BuildingBlocks.Abstractions.ValueObjects;
using Common.Constants;
using Common.Models.Identity;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;

#endregion

namespace BuildingBlocks.AuthorizationServer.Extensions;

public static class UserIdentityExtension
{
    #region Methods

    public static UserIdentity GetCurrentUser(this IHttpContextAccessor context)
    {
        var identity = context.HttpContext?.User;
        var userId = identity?.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? string.Empty;
        var userName = identity?.FindFirst(CustomClaimTypes.UserName)?.Value ?? string.Empty;
        var firstName = identity?.FindFirst(ClaimTypes.GivenName)?.Value ?? string.Empty;
        var lastName = identity?.FindFirst(ClaimTypes.Surname)?.Value ?? string.Empty;
        var email = identity?.FindFirst(ClaimTypes.Email)?.Value ?? string.Empty;
        var tenant = identity?.FindFirst(CustomClaimTypes.Tenant)?.Value ?? string.Empty;
        var roles = identity?.FindAll(ClaimTypes.Role).Select(c => c.Value).ToList() ?? [];
        bool.TryParse(identity?.FindFirst(CustomClaimTypes.EmailVerified)?.Value, out bool emailVerified);

        return new UserIdentity()
        {
            EmailVerified = emailVerified,
            FirstName = firstName,
            LastName = lastName,
            Email = email,
            Id = userId,
            UserName = userName,
            Tenant = tenant,
            Roles = roles
        };
    }

    #endregion
}
