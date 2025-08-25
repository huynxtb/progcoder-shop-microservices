#region using

using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.OpenApi.Models;

#endregion

namespace BuildingBlocks.Swagger.Extensions;

public static class FormOpenApiExtensions
{
    #region Methods

    public static RouteHandlerBuilder WithMultipartForm<T>(
        this RouteHandlerBuilder builder,
        string[]? required = null) where T : class
    {
        return builder.Accepts<T>("multipart/form-data")
                .WithOpenApi(op =>
                {
                    var schema = new OpenApiSchema
                    {
                        Type = "object",
                        Properties = new Dictionary<string, OpenApiSchema>()
                    };

                    foreach (var p in typeof(T).GetProperties())
                    {
                        var name = p.Name;
                        var t = p.PropertyType;
                        var u = Nullable.GetUnderlyingType(t) ?? t;

                        if (typeof(IFormFile).IsAssignableFrom(u))
                        {
                            schema.Properties[name] = new OpenApiSchema
                            {
                                Type = "string",
                                Format = "binary"
                            };
                            continue;
                        }

                        // arrays / lists of files
                        if (typeof(IEnumerable<IFormFile>).IsAssignableFrom(u) && u != typeof(string))
                        {
                            schema.Properties[name] = new OpenApiSchema
                            {
                                Type = "array",
                                Items = new OpenApiSchema { Type = "string", Format = "binary" }
                            };
                            continue;
                        }

                        // map primitives
                        schema.Properties[name] = MapPrimitive(u);
                        schema.Properties[name].Nullable = (Nullable.GetUnderlyingType(t) != null);
                    }

                    if (required != null)
                    {
                        foreach (var r in required) schema.Required.Add(r);
                    }

                    op.RequestBody = new OpenApiRequestBody
                    {
                        Required = true,
                        Content =
                        {
                            ["multipart/form-data"] = new OpenApiMediaType
                            {
                                Schema = schema
                            }
                        }
                    };

                    return op;
                });
    }

    private static OpenApiSchema MapPrimitive(Type t)
    {
        if (t == typeof(string)) return new() { Type = "string" };
        if (t == typeof(bool)) return new() { Type = "boolean" };
        if (t == typeof(int) || t == typeof(long)) return new() { Type = "integer", Format = (t == typeof(long) ? "int64" : "int32") };
        if (t == typeof(decimal) || t == typeof(double) || t == typeof(float)) return new() { Type = "number" };
        if (t == typeof(DateTime) || t == typeof(DateTimeOffset)) return new() { Type = "string", Format = "date-time" };
        return new() { Type = "string" }; // fallback
    }
    #endregion
}
