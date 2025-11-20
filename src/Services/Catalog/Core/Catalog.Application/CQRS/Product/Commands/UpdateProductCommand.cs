#region using

using AutoMapper;
using Catalog.Application.Dtos.Products;
using Catalog.Application.Services;
using Catalog.Domain.Entities;
using Catalog.Domain.Events;
using Marten;
using MediatR;

#endregion

namespace Catalog.Application.CQRS.Product.Commands;

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
    IMediator mediator) : ICommandHandler<UpdateProductCommand, Guid>
{
    #region Implementations

    public async Task<Guid> Handle(UpdateProductCommand command, CancellationToken cancellationToken)
    {
        await session.BeginTransactionAsync(cancellationToken);

        var entity = await session.LoadAsync<ProductEntity>(command.ProductId)
            ?? throw new ClientValidationException(MessageCode.ProductIsNotExists, command.ProductId);

        var dto = command.Dto;
        var categories = await session.Query<CategoryEntity>().ToListAsync(token: cancellationToken);
        ValidateCategory(dto.CategoryIds, categories.ToList());

        entity.Update(name: dto.Name!,
            sku: dto.Sku!,
            slug: dto.Name!.Slugify(),
            shortDescription: dto.ShortDescription!,
            longDescription: dto.LongDescription!,
            price: dto.Price,
            salesPrice: dto.SalesPrice,
            categoryIds: dto.CategoryIds?.Distinct().ToList(),
            performedBy: command.Actor.ToString());

        await UploadImagesAsync(dto.Files, dto.CurrentImageUrls, entity, cancellationToken);

        session.Store(entity);

        var @event = new UpsertedProductDomainEvent(
            entity.Id,
            entity.Name!,
            entity.Sku!,
            entity.Slug!,
            entity.Price,
            entity.SalesPrice,
            entity.CategoryIds?.Select(id => id.ToString()).ToList(),
            entity.Images?.Select(img => img.PublicURL).Where(url => !string.IsNullOrWhiteSpace(url)).Cast<string>().ToList(),
            entity.Thumbnail!,
            entity.Status,
            entity.CreatedOnUtc,
            entity.CreatedBy!,
            entity.LastModifiedOnUtc,
            entity.LastModifiedBy);

        await mediator.Publish(@event, cancellationToken);
        await session.SaveChangesAsync(cancellationToken);

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
            var result = await minIO.UploadFilesAsync(filesDto, Constants.Bucket.Products, true, cancellationToken);
            newImages = mapper.Map<List<ProductImageEntity>>(result);
        }
        entity.AddOrUpdateImages(newImages, currentImageUrls);
    }

    private static void ValidateCategory(List<Guid>? inputCategoryIds, List<CategoryEntity> categories)
    {
        if (inputCategoryIds is { Count: > 0 })
        {
            var existingIds = categories.Select(c => c.Id).ToHashSet();
            var invalidIds = inputCategoryIds.Where(id => !existingIds.Contains(id)).ToList();

            if (invalidIds.Any())
            {
                throw new ClientValidationException(MessageCode.CategoryIsNotExists, string.Join(", ", invalidIds));
            }
        }
    }

    #endregion
}