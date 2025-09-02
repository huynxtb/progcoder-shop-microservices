#region using

using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using Common.Configurations;

#endregion

namespace BuildingBlocks.Swagger.Extensions;

public static class SwaggerGenExtension
{
    #region Methods

    public static IServiceCollection AddSwaggerServices(
        this IServiceCollection services, 
        IConfiguration cfg)
    {
        var authority = cfg[$"{AuthorizationCfg.Section}:{AuthorizationCfg.Authority}"];
        var clientId = cfg[$"{AuthorizationCfg.Section}:{AuthorizationCfg.ClientId}"];
        var clientSecret = cfg[$"{AuthorizationCfg.Section}:{AuthorizationCfg.ClientSecret}"];
        var scopesArray = cfg.GetValue<string[]>($"{AuthorizationCfg.Section}:{AuthorizationCfg.Scopes}");
        var oauthScopes = scopesArray?.ToDictionary(s => s, s => $"OpenID scope {s}");
        var authUrl = new Uri($"{authority}/protocol/openid-connect/auth");
        var tokenUrl = new Uri($"{authority}/protocol/openid-connect/token");

        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen(opts =>
        {
            opts.SwaggerDoc("v1", new OpenApiInfo
            {
                Title = cfg[$"{AppConfigCfg.Section}:{AppConfigCfg.ServiceName}"],
                Version = "v1",
                Description = $"This is an API for {cfg[$"{AppConfigCfg.Section}:{AppConfigCfg.ServiceName}"]}",
                Contact = new OpenApiContact
                {
                    Name = cfg[$"{SwaggerGenCfg.Section}:{SwaggerGenCfg.ContactName}"],
                    Email = cfg[$"{SwaggerGenCfg.Section}:{SwaggerGenCfg.ContactEmail}"],
                    Url = new Uri(cfg[$"{SwaggerGenCfg.Section}:{SwaggerGenCfg.ContactUrl}"]!)
                }
            });

            opts.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
            {
                In = ParameterLocation.Header,
                Name = "Authorization",
                Type = SecuritySchemeType.ApiKey,
                Scheme = "Bearer",
                BearerFormat = "JWT",
                Description = "Enter ‘Bearer {token}’"
            });
            opts.AddSecurityRequirement(new OpenApiSecurityRequirement
            {
                [new OpenApiSecurityScheme
                {
                    Reference = new OpenApiReference
                    {
                        Type = ReferenceType.SecurityScheme,
                        Id = "Bearer"
                    }
                }] = Array.Empty<string>()
            });

            opts.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
            {
                Type = SecuritySchemeType.OAuth2,
                Flows = new OpenApiOAuthFlows
                {
                    AuthorizationCode = new OpenApiOAuthFlow
                    {
                        AuthorizationUrl = authUrl,
                        TokenUrl = tokenUrl,
                        Scopes = oauthScopes
                    }
                }
            });

            opts.OperationFilter<AuthorizeCheckOperationFilter>();
        });

        return services;
    }

    public static WebApplication UseSwaggerApi(this WebApplication app)
    {
        var cfg = app.Configuration;

        if (!cfg.GetValue<bool>($"{SwaggerGenCfg.Section}:{SwaggerGenCfg.Enable}")) 
            return app;

        var clientId = cfg[$"{AuthorizationCfg.Section}:{AuthorizationCfg.ClientId}"];
        var clientSecret = cfg[$"{AuthorizationCfg.Section}:{AuthorizationCfg.ClientSecret}"];
        var scopes = cfg.GetValue<string[]>($"{AuthorizationCfg.Section}:{AuthorizationCfg.Scopes}");

        app.UseSwagger();
        app.UseSwaggerUI(c =>
        {
            c.SwaggerEndpoint("/swagger/v1/swagger.json", "v1");
            c.OAuthClientId(clientId);
            c.OAuthClientSecret(clientSecret);
            //c.OAuthUsePkce();
            c.OAuthScopes(scopes);
            c.OAuth2RedirectUrl(cfg[$"{AuthorizationCfg.Section}:{AuthorizationCfg.OAuth2RedirectUrl}"]);
        });

        return app;
    }

    #endregion
}
