
#region using

using BuildingBlocks.Exceptions;
using BuildingBlocks.Swagger.Extensions;
using Catalog.Api.Constants;
using Catalog.Api.Models;
using Catalog.Application.CQRS.Product.Commands;
using Catalog.Application.Dtos.Products;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Common.Constants;
using Common.Models;
using BuildingBlocks.Authentication.Extensions;

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
            .Produces<ApiCreatedResponse<Guid>>(StatusCodes.Status200OK)
            .Produces(StatusCodes.Status403Forbidden)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .DisableAntiforgery()
            .RequireAuthorization();
    }

    #endregion

    #region Methods

    private async Task<ApiCreatedResponse<Guid>> HandleCreateProductAsync(
        ISender sender,
        IMapper mapper,
        IHttpContextAccessor httpContext,
        [FromForm] CreateProductRequest req)
    {
        if (req == null) throw new ClientValidationException(MessageCode.BadRequest);
        if ((req.ImageFiles == null || req.ImageFiles.Count == 0) && httpContext.HttpContext != null)
        {
            req.ImageFiles = httpContext.HttpContext.Request.Form.Files.ToList();
        }

        var dto = mapper.Map<CreateProductDto>(req);

        if (req.ImageFiles != null && req.ImageFiles.Count > 0)
        {
            dto.UploadImages ??= new();
            foreach (var file in req.ImageFiles!)
            {
                using var ms = new MemoryStream();
                await file.CopyToAsync(ms);
                dto.UploadImages.Add(new UploadFileBytes
                {
                    FileName = file.FileName,
                    Bytes = ms.ToArray(),
                    ContentType = file.ContentType
                });
            }
        }

        if (req.ThumbnailFile != null && req.ThumbnailFile.Length > 0)
        {
            using var ms = new MemoryStream();
            await req.ThumbnailFile.CopyToAsync(ms);

            dto.UploadThumbnail = new UploadFileBytes
            {
                FileName = req.ThumbnailFile.FileName,
                Bytes = ms.ToArray(),
                ContentType = req.ThumbnailFile.ContentType
            };
        }

        var currentUser = httpContext.GetCurrentUser();
        var command = new CreateProductCommand(dto, Actor.User(currentUser.Id));

        var result = await sender.Send(command);

        return new ApiCreatedResponse<Guid>(result);
    }

    #endregion
}
