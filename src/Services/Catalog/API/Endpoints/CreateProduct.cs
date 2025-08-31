
#region using

using BuildingBlocks.Exceptions;
using BuildingBlocks.Swagger.Extensions;
using Catalog.Api.Constants;
using Catalog.Api.Models;
using Catalog.Application.CQRS.Product.Commands;
using Catalog.Application.Dtos.Products;
using Mapster;
using Microsoft.AspNetCore.Mvc;
using SourceCommon.Constants;
using SourceCommon.Models;
using SourceCommon.Models.Reponses;

#endregion

namespace Catalog.Api.Endpoints;

public sealed class CreateProduct : ICarterModule
{
    #region Implementations

    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost(ApiRoutes.Product.Create, HandleCreateProductAsync)
            .WithTags(ApiRoutes.Product.Tags)
            .WithName(nameof(CreateProduct))
            .WithMultipartForm<CreateProductRequest>()
            .Produces<ResultSharedResponse<string>>(StatusCodes.Status200OK)
            .Produces(StatusCodes.Status403Forbidden)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .ProducesProblem(StatusCodes.Status404NotFound)
            .DisableAntiforgery()
            .RequireAuthorization();
    }

    #endregion

    #region Methods

    private async Task<ResultSharedResponse<string>> HandleCreateProductAsync(
        ISender sender,
        IHttpContextAccessor httpContext,
        [FromForm] CreateProductRequest req)
    {
        if (req == null) throw new ClientValidationException(MessageCode.BadRequest);
        if ((req.FormFiles == null || req.FormFiles.Count == 0) && httpContext.HttpContext != null)
        {
            req.FormFiles = httpContext.HttpContext.Request.Form.Files.ToList();
        }

        var dto = req.Adapt<CreateProductDto>();
        dto.Files ??= new();

        foreach (var file in req.FormFiles!)
        {
            using var ms = new MemoryStream();
            await file.CopyToAsync(ms);
            dto.Files.Add(new UploadFileBytes
            {
                FileName = file.FileName,
                Bytes = ms.ToArray(),
                ContentType = file.ContentType
            });
        }

        var currentUser = httpContext.GetCurrentUser();
        var command = new CreateProductCommand(dto, currentUser.Id);

        return await sender.Send(command);
    }

    #endregion
}
