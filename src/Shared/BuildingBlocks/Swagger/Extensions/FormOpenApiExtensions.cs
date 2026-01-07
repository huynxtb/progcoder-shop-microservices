#region using
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.OpenApi.Models;
#endregion

namespace BuildingBlocks.Swagger.Extensions;

public static class FormOpenApiExtensions
{
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
                var media = new OpenApiMediaType { Schema = schema };

                foreach (var p in typeof(T).GetProperties())
                {
                    var name = char.ToLowerInvariant(p.Name[0]) + p.Name[1..];
                    var t = p.PropertyType;
                    var u = Nullable.GetUnderlyingType(t) ?? t;
                    if (typeof(IFormFile).IsAssignableFrom(u))
                    {
                        schema.Properties[name] = new OpenApiSchema { Type = "string", Format = "binary" };
                        continue;
                    }

                    if (typeof(IEnumerable<IFormFile>).IsAssignableFrom(u) && u != typeof(string))
                    {
                        schema.Properties[name] = new OpenApiSchema
                        {
                            Type = "array",
                            Items = new OpenApiSchema { Type = "string", Format = "binary" }
                        };
                        continue;
                    }

                    if (typeof(System.Collections.IEnumerable).IsAssignableFrom(u) && u != typeof(string))
                    {
                        var elemType = u.IsArray ? u.GetElementType()! :
                                       u.GenericTypeArguments.FirstOrDefault() ?? typeof(string);

                        schema.Properties[name] = new OpenApiSchema
                        {
                            Type = "array",
                            Items = MapPrimitive(elemType)
                        };

                        media.Encoding[name] = new OpenApiEncoding
                        {
                            Style = ParameterStyle.Form,
                            Explode = true
                        };
                        continue;
                    }

                    var s = MapPrimitive(u);
                    s.Nullable = (Nullable.GetUnderlyingType(t) != null);
                    schema.Properties[name] = s;
                }

                if (required != null)
                    foreach (var r in required) schema.Required.Add(r);

                op.RequestBody = new OpenApiRequestBody
                {
                    Required = true,
                    Content = { ["multipart/form-data"] = media }
                };

                return op;
            });
    }

    private static OpenApiSchema MapPrimitive(Type t)
    {
        if (t == typeof(string)) return new() { Type = "string" };
        if (t == typeof(bool)) return new() { Type = "boolean" };
        if (t == typeof(int)) return new() { Type = "integer", Format = "int32" };
        if (t == typeof(long)) return new() { Type = "integer", Format = "int64" };
        if (t == typeof(float) || t == typeof(double) || t == typeof(decimal)) return new() { Type = "number" };
        if (t == typeof(DateTime) || t == typeof(DateTimeOffset)) return new() { Type = "string", Format = "date-time" };
        return new() { Type = "string" };
    }
}
