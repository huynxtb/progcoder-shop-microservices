#region using

using BuildingBlocks.Abstractions.ValueObjects;
using BuildingBlocks.Exceptions;
using BuildingBlocks.Swagger.Extensions;
using Basket.Api.Constants;
using Basket.Api.Models;
using Basket.Application.CQRS.Product.Commands;
using Basket.Application.Dtos.Products;
using Common.Constants;
using Common.Models;
using Common.Models.Reponses;
using Mapster;
using Microsoft.AspNetCore.Mvc;

#endregion

namespace Basket.Api.Endpoints;

public sealed class UpdateProduct : ICarterModule
{
    #region Implementations

    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPut(ApiRoutes.Product.Update, HandleUpdateProductAsync)
            .WithTags(ApiRoutes.Product.Tags)
            .WithName(nameof(UpdateProduct))
            .WithMultipartForm<UpdateProductRequest>()
            .Produces<Guid>(StatusCodes.Status200OK)
			.Produces(StatusCodes.Status403Forbidden)
			.ProducesProblem(StatusCodes.Status400BadRequest)
            .ProducesProblem(StatusCodes.Status404NotFound)
            .DisableAntiforgery()
            .RequireAuthorization();
    }

    #endregion

    #region Methods

    private async Task<Guid> HandleUpdateProductAsync(
        ISender sender,
        IHttpContextAccessor httpContext,
        [FromRoute] Guid productId,
        [FromForm] UpdateProductRequest req)
    {
        if (req == null) throw new ClientValidationException(MessageCode.BadRequest);
        if ((req.FormFiles == null || req.FormFiles.Count == 0) && httpContext.HttpContext != null)
        {
            req.FormFiles = httpContext.HttpContext.Request.Form.Files.ToList();
        }

        var dto = req.Adapt<UpdateProductDto>();
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
        var command = new UpdateProductCommand(productId, dto, Actor.User(currentUser.Email));

        return await sender.Send(command);
    }

    #endregion
}
