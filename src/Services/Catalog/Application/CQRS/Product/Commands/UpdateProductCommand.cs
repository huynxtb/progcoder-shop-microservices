#region using

using Catalog.Application.Dtos.Products;
using Catalog.Application.Services;
using Catalog.Domain.Entities;
using Marten;
using SourceCommon.Models.Reponses;

#endregion

namespace Catalog.Application.CQRS.Product.Commands;

public record UpdateProductCommand(Guid ProductId, UpdateProductDto Dto, Guid CurrentUserId) : ICommand<ResultSharedResponse<string>>;

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

public class UpdateProductCommandHandler(
    IDocumentSession session,
    IMinIOCloudService minIO) : ICommandHandler<UpdateProductCommand, ResultSharedResponse<string>>
{
    #region Implementations

    public async Task<ResultSharedResponse<string>> Handle(UpdateProductCommand command, CancellationToken cancellationToken)
    {
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
            modifiedBy: command.CurrentUserId.ToString());

        await UploadImagesAsync(dto.Files, dto.CurrentImageUrls, entity, cancellationToken);

        session.Store(entity);
        await session.SaveChangesAsync(cancellationToken);

        return ResultSharedResponse<string>.Success(
            data: entity.Id.ToString(),
            message: MessageCode.UpdateSuccess);
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
            var result = await minIO.UploadFilesAsync(filesDto, BucketName.Products, true, cancellationToken);
            newImages = result.Adapt<List<ProductImageEntity>>();
        }
        entity.AddOrUpdateImages(newImages, currentImageUrls);
    }

    private void ValidateCategory(List<Guid>? inputCategoryIds, List<CategoryEntity> categories)
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