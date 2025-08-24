#region using

using Microsoft.AspNetCore.Authorization;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;

#endregion

namespace BuildingBlocks.Swagger;

public sealed class AuthorizeCheckOperationFilter : IOperationFilter
{
    #region Implementations

    public void Apply(OpenApiOperation operation, OperationFilterContext context)
    {
        var hasAuthorize = context.ApiDescription
            .ActionDescriptor
            .EndpointMetadata
            .OfType<IAuthorizeData>()
            .Any();

        if (!hasAuthorize) return;

        operation.Responses.TryAdd("401", new OpenApiResponse { Description = "Unauthorized" });
        operation.Responses.TryAdd("403", new OpenApiResponse { Description = "Forbidden" });

        operation.Security = new List<OpenApiSecurityRequirement>
        {
            new OpenApiSecurityRequirement
            {
                [ new OpenApiSecurityScheme {
                    Reference = new OpenApiReference {
                        Type = ReferenceType.SecurityScheme,
                        Id   = "oauth2"
                    }
                }] = new[] { "openid" }
            }
        };
    }

    #endregion
}