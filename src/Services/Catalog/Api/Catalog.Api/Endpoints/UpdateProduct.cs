#region using

using BuildingBlocks.Authentication.Extensions;
using BuildingBlocks.Exceptions;
using BuildingBlocks.Swagger.Extensions;
using Catalog.Api.Constants;
using Catalog.Api.Models;
using Catalog.Application.Features.Product.Commands;
using Catalog.Application.Dtos.Products;
using Common.Constants;
using Common.Models;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

#endregion

namespace Catalog.Api.Endpoints;

public sealed class UpdateProduct : ICarterModule
{
    #region Implementations

    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPut(ApiRoutes.Product.Update, HandleUpdateProductAsync)
            .WithTags(ApiRoutes.Product.Tags)
            .WithName(nameof(UpdateProduct))
            .WithMultipartForm<UpdateProductRequest>()
            .Produces<ApiUpdatedResponse<Guid>>(StatusCodes.Status200OK)
            .Produces(StatusCodes.Status403Forbidden)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .ProducesProblem(StatusCodes.Status404NotFound)
            .DisableAntiforgery()
            .RequireAuthorization();
    }

    #endregion

    #region Methods

    private async Task<ApiUpdatedResponse<Guid>> HandleUpdateProductAsync(
        ISender sender,
        IMapper mapper,
        IHttpContextAccessor httpContext,
        [FromRoute] Guid productId,
        [FromForm] UpdateProductRequest req)
    {
        if (req == null) throw new ClientValidationException(MessageCode.BadRequest);
        if ((req.ImageFiles == null || req.ImageFiles.Count == 0) && httpContext.HttpContext != null)
        {
            req.ImageFiles = httpContext.HttpContext.Request.Form.Files.ToList();
        }

        var dto = mapper.Map<UpdateProductDto>(req);

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
        var command = new UpdateProductCommand(productId, dto, Actor.User(currentUser.Email));

        var result = await sender.Send(command);

        return new ApiUpdatedResponse<Guid>(result);
    }

    #endregion
}
