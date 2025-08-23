#region using

using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using SourceCommon.Configurations;
using SourceCommon.Constants;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text.Json;

#endregion

public static class AuthenticationExtensions
{
    #region Methods

    public static IServiceCollection AddAuthenticationAndAuthorization(
        this IServiceCollection services,
        IConfiguration cfg)
    {
        var authority = cfg[$"{AuthorizationCfg.Section}:{AuthorizationCfg.Authority}"];
        var clientId = cfg[$"{AuthorizationCfg.Section}:{AuthorizationCfg.ClientId}"];
        var audience = cfg[$"{AuthorizationCfg.Section}:{AuthorizationCfg.Audience}"];
        var requireHttps = cfg.GetValue<bool>($"{AuthorizationCfg.Section}:{AuthorizationCfg.RequireHttpsMetadata}");

        services.AddAuthentication(options =>
        {
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        })
        .AddJwtBearer(options =>
        {
            options.Authority = authority;
            options.Audience = audience;
            options.RequireHttpsMetadata = requireHttps;
            options.SaveToken = true;

            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = false,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,

                ClockSkew = TimeSpan.FromSeconds(60),

                NameClaimType = JwtRegisteredClaimNames.Sub,
                RoleClaimType = ClaimTypes.Role
            };

            options.Events = new JwtBearerEvents
            {
                OnTokenValidated = ctx =>
                {
                    var id = ctx.Principal?.Identity as ClaimsIdentity;

                    if (id == null) return Task.CompletedTask;

                    var realmAccess = ctx.Principal!.FindFirst(CustomClaimTypes.RealmAccess)?.Value;
                    if (realmAccess != null)
                    {
                        using var doc = JsonDocument.Parse(realmAccess);
                        if (doc.RootElement.TryGetProperty(CustomClaimTypes.Roles, out var roles))
                        {
                            foreach (var r in roles.EnumerateArray())
                            {
                                var role = r.GetString();
                                if (!string.IsNullOrEmpty(role))
                                    id.AddClaim(new Claim(ClaimTypes.Role, role));
                            }
                        }
                    }

                    return Task.CompletedTask;
                }
            };
        });

        services.AddAuthorization();

        return services;
    }

    #endregion
}
