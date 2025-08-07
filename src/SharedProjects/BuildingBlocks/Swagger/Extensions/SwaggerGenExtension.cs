#region using

using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using SourceCommon.Configurations;

#endregion

namespace BuildingBlocks.Swagger.Extensions;

public static class SwaggerGenExtension
{
    #region Methods

    public static IServiceCollection AddSwaggerServices(
        this IServiceCollection services, 
        IConfiguration configuration)
    {
        services.Configure<SwaggerGenOptions>(
            configuration.GetSection(SwaggerGenOptions.Section));

        var authOptions = configuration
            .GetSection(AuthorizationOptions.Section)
            .Get<AuthorizationOptions>()
            ?? throw new InvalidOperationException("AuthorizationOptions section is missing or invalid.");

        var appCfgOpt = configuration
            .GetSection(AppConfigOptions.Section)
            .Get<AppConfigOptions>()
            ?? throw new InvalidOperationException("AppConfigOptions section is missing or invalid.");

        var authority = authOptions.Authority;
        var clientId = authOptions.ClientId;
        var clientSecret = authOptions.ClientSecret;
        var scopesArray = authOptions.Scopes;
        var oauthScopes = scopesArray?.ToDictionary(s => s, s => $"OpenID scope {s}");
        var authUrl = new Uri($"{authority}/protocol/openid-connect/auth");
        var tokenUrl = new Uri($"{authority}/protocol/openid-connect/token");

        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen(opts =>
        {
            opts.SwaggerDoc("v1", new OpenApiInfo
            {
                Title = appCfgOpt.ServiceName,
                Version = "v1",
                Description = $"This is an API for {appCfgOpt.ServiceName}"
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
        var swaggerGenOpt = app.Configuration
            .GetSection(SwaggerGenOptions.Section)
            .Get<SwaggerGenOptions>()
            ?? throw new InvalidOperationException("AuthorizationOptions section is missing or invalid.");

        if (!swaggerGenOpt.Enable) return app;

        var authOptions = app.Configuration
            .GetSection(AuthorizationOptions.Section)
            .Get<AuthorizationOptions>()
            ?? throw new InvalidOperationException("AuthorizationOptions section is missing or invalid.");

        var clientId = authOptions.ClientId;
        var clientSecret = authOptions.ClientSecret;
        var scopes = authOptions.Scopes;

        app.UseSwagger();
        app.UseSwaggerUI(c =>
        {
            c.SwaggerEndpoint("/swagger/v1/swagger.json", "v1");
            c.OAuthClientId(clientId);
            c.OAuthClientSecret(clientSecret);
            //c.OAuthUsePkce();
            c.OAuthScopes(scopes);
            c.OAuth2RedirectUrl(authOptions.OAuth2RedirectUrl);
        });

        return app;
    }

    #endregion
}
