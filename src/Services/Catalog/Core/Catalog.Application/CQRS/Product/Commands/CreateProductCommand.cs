#region using

using AutoMapper;
using BuildingBlocks.Abstractions.ValueObjects;
using Catalog.Application.Dtos.Products;
using Catalog.Application.Services;
using Catalog.Domain.Entities;
using Common.Models.Reponses;
using JasperFx.Core;
using Marten;
using MediatR;
using Microsoft.AspNetCore.Http.HttpResults;
using System.Threading;

#endregion

namespace Catalog.Application.CQRS.Product.Commands;

public record CreateProductCommand(CreateProductDto Dto, Actor Actor) : ICommand<Guid>;

public class CreateProductCommandValidator : AbstractValidator<CreateProductCommand>
{
    #region Ctors

    public CreateProductCommandValidator()
    {
        RuleFor(x => x.Dto)
            .NotNull()
            .WithMessage(MessageCode.BadRequest)
            .DependentRules(() =>
            {
                RuleFor(x => x.Dto.Name)
                    .NotEmpty()
                    .WithMessage(MessageCode.ProductNameIsRequired);

                RuleFor(x => x.Dto.Sku)
                    .NotEmpty()
                    .WithMessage(MessageCode.SkuIsRequired);

                RuleFor(x => x.Dto.ShortDescription)
                    .NotEmpty()
                    .WithMessage(MessageCode.ShortDescriptionIsRequired);

                RuleFor(x => x.Dto.LongDescription)
                    .NotEmpty()
                    .WithMessage(MessageCode.LongDescriptionIsRequired);

                RuleFor(x => x.Dto.Price)
                    .NotEmpty()
                    .WithMessage(MessageCode.PriceIsRequired)
                    .GreaterThan(1)
                    .WithMessage(MessageCode.PriceIsRequired);

                RuleFor(x => x.Dto.UploadThumbnail)
                    .NotNull()
                    .WithMessage(MessageCode.ThumbnailIsRequired);
            });

    }

    #endregion
}

public class CreateProductCommandHandler(IMapper mapper,
    IDocumentSession session,
    IMinIOCloudService minIO,
    ISender sender) : ICommandHandler<CreateProductCommand, Guid>
{
    #region Implementations

    public async Task<Guid> Handle(CreateProductCommand command, CancellationToken cancellationToken)
    {
        var dto = command.Dto;
        
        await session.BeginTransactionAsync(cancellationToken);

        await ValidateCategoryAsync(dto.CategoryIds, cancellationToken);
        await ValidateBrandAsync(dto.BrandId, cancellationToken);

        var entity = ProductEntity.Create(
            id: Guid.NewGuid(),
            name: dto.Name!,
            sku: dto.Sku!,
            slug: dto.Name!.Slugify(),
            shortDescription: dto.ShortDescription!,
            longDescription: dto.LongDescription!,
            price: dto.Price,
            salePrice: dto.SalePrice,
            categoryIds: dto.CategoryIds?.Distinct().ToList(),
            brandId: dto.BrandId,
            performedBy: command.Actor.ToString());

        await UploadImagesAsync(dto.UploadImages, entity, cancellationToken);
        await UploadThumbnailAsync(dto.UploadThumbnail, entity, cancellationToken);

        entity.UpdateColors(dto.Colors?.Distinct().ToList(), command.Actor.ToString());
        entity.UpdateSizes(dto.Sizes?.Distinct().ToList(), command.Actor.ToString());
        entity.UpdateTags(dto.Tags?.Distinct().ToList(), command.Actor.ToString());
        entity.UpdateSEO(dto.SEOTitle, dto.SEODescription, command.Actor.ToString());
        entity.UpdateFeatured(dto.Featured, command.Actor.ToString());
        entity.UpdateBarcode(dto.Barcode, command.Actor.ToString());
        entity.UpdateUnitAndWeight(dto.Unit, dto.Weight, command.Actor.ToString());

        if (command.Dto.Published)
        {
            entity.Publish(command.Actor.ToString());
        }

        session.Store(entity);

        await session.SaveChangesAsync(cancellationToken);

        if (entity.Published)
        {
            await sender.Send(new PublishProductCommand(entity.Id, command.Actor), cancellationToken);
        }

        return entity.Id;
    }

    #endregion

    #region Methods

    private async Task UploadThumbnailAsync(UploadFileBytes? image, ProductEntity entity, CancellationToken cancellationToken)
    {
        var result = await minIO.UploadFilesAsync([image!], AppConstants.Bucket.Products, true, cancellationToken);
        var thumbnail = result.FirstOrDefault();
        entity.AddOrUpdateThumbnail(mapper.Map<ProductImageEntity>(thumbnail));
    }

    private async Task UploadImagesAsync(
        List<UploadFileBytes>? filesDto,
        ProductEntity entity,
        CancellationToken cancellationToken)
    {
        if (filesDto != null && filesDto.Any())
        {
            var result = await minIO.UploadFilesAsync(filesDto, AppConstants.Bucket.Products, true, cancellationToken);
            entity.AddOrUpdateImages(mapper.Map<List<ProductImageEntity>>(result));
        }
    }

    private async Task ValidateCategoryAsync(List<Guid>? inputCategoryIds, CancellationToken cancellationToken = default)
    {
        if (inputCategoryIds is { Count: > 0 })
        {
            var categories = await session.Query<CategoryEntity>().ToListAsync(token: cancellationToken);

            var existingIds = categories.Select(c => c.Id).ToHashSet();
            var invalidIds = inputCategoryIds.Where(id => !existingIds.Contains(id)).ToList();

            if (invalidIds.Any())
            {
                throw new ClientValidationException(MessageCode.CategoryIsNotExists, string.Join(", ", invalidIds));
            }
        }
    }

    private async Task ValidateBrandAsync(Guid? brandId, CancellationToken cancellationToken = default)
    {
        if (brandId.HasValue)
        {
            var brands = await session.Query<BrandEntity>().ToListAsync(token: cancellationToken);
            var existingIds = brands.Select(b => b.Id).ToHashSet();
            if (!existingIds.Contains(brandId.Value))
            {
                throw new ClientValidationException(MessageCode.BrandIsNotExists, brandId);
            }
        }
    }

    #endregion
}