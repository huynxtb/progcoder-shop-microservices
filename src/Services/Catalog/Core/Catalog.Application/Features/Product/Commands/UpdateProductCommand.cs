#region using

using AutoMapper;
using Catalog.Application.Dtos.Products;
using Catalog.Application.Services;
using Catalog.Domain.Entities;
using Catalog.Domain.Events;
using Marten;
using MediatR;

#endregion

namespace Catalog.Application.Features.Product.Commands;

public record UpdateProductCommand(Guid ProductId, UpdateProductDto Dto, Actor Actor) : ICommand<Guid>;

public class UpdateProductCommandValidator : AbstractValidator<UpdateProductCommand>
{
    #region Ctors

    public UpdateProductCommandValidator()
    {
        RuleFor(x => x.ProductId)
            .NotEmpty()
            .WithMessage(MessageCode.ProductIdIsRequired);

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
            });
    }

    #endregion
}

public class UpdateProductCommandHandler(IMapper mapper,
    IDocumentSession session,
    IMinIOCloudService minIO,
    IMediator mediator,
    ISender sender) : ICommandHandler<UpdateProductCommand, Guid>
{
    #region Implementations

    public async Task<Guid> Handle(UpdateProductCommand command, CancellationToken cancellationToken)
    {
        await session.BeginTransactionAsync(cancellationToken);

        var entity = await session.LoadAsync<ProductEntity>(command.ProductId)
            ?? throw new ClientValidationException(MessageCode.ProductIsNotExists, command.ProductId);

        var currentPublishStatus = entity.Published;
        var dto = command.Dto;

        await ValidateCategoryAsync(dto.CategoryIds, cancellationToken);
        await ValidateBrandAsync(dto.BrandId, cancellationToken);

        entity.Update(name: dto.Name!,
            sku: dto.Sku!,
            slug: dto.Name!.Slugify(),
            shortDescription: dto.ShortDescription!,
            longDescription: dto.LongDescription!,
            price: dto.Price,
            salePrice: dto.SalePrice,
            categoryIds: dto.CategoryIds?.Distinct().ToList(),
            brandId: dto.BrandId,
            performedBy: command.Actor.ToString());

        await UploadImagesAsync(dto.UploadImages, dto.CurrentImageUrls, entity, cancellationToken);
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
        else
        {
            entity.Unpublish(command.Actor.ToString());
        }

        session.Store(entity);

        var @event = new UpsertedProductDomainEvent(
            entity.Id,
            entity.Name!,
            entity.Sku!,
            entity.Slug!,
            entity.Price,
            entity.SalePrice,
            entity.CategoryIds?.Select(id => id.ToString()).ToList(),
            entity.Images?.Select(img => img.PublicURL).Where(url => !string.IsNullOrWhiteSpace(url)).Cast<string>().ToList(),
            entity.Thumbnail?.PublicURL!,
            entity.Status,
            entity.CreatedOnUtc,
            entity.CreatedBy!,
            entity.LastModifiedOnUtc,
            entity.LastModifiedBy);

        await mediator.Publish(@event, cancellationToken);
        await session.SaveChangesAsync(cancellationToken);

        if (command.Dto.Published)
        {
            await sender.Send(new PublishProductCommand(entity.Id, command.Actor), cancellationToken);
        }
        else
        {
            await sender.Send(new UnpublishProductCommand(entity.Id, command.Actor), cancellationToken);
        }

        return entity.Id;
    }

    #endregion

    #region Methods

    private async Task UploadImagesAsync(
        List<UploadFileBytes>? filesDto,
        List<string>? currentImageUrls,
        ProductEntity entity,
        CancellationToken cancellationToken)
    {
        var newImages = new List<ProductImageEntity>();
        if (filesDto != null && filesDto.Any())
        {
            var result = await minIO.UploadFilesAsync(filesDto, AppConstants.Bucket.Products, true, cancellationToken);
            newImages = mapper.Map<List<ProductImageEntity>>(result);
        }
        entity.AddOrUpdateImages(newImages, currentImageUrls);
    }

    private async Task UploadThumbnailAsync(UploadFileBytes? image, ProductEntity entity, CancellationToken cancellationToken)
    {
        if (image == null) return;

        var result = await minIO.UploadFilesAsync([image], AppConstants.Bucket.Products, true, cancellationToken);
        var thumbnail = result.FirstOrDefault();
        entity.AddOrUpdateThumbnail(mapper.Map<ProductImageEntity>(thumbnail));
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