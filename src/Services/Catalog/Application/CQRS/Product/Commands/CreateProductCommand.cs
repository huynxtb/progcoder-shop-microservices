#region using

using Catalog.Application.Dtos.Products;
using Catalog.Application.Services;
using Catalog.Domain.Entities;
using Mapster;
using Marten;
using Microsoft.AspNetCore.Http.HttpResults;
using SourceCommon.Models.Reponses;

#endregion

namespace Catalog.Application.CQRS.Product.Commands;

public record CreateProductCommand(CreateProductDto Dto, Guid CurrentUserId) : ICommand<ResultSharedResponse<string>>;

public class UpdateUserProfileCommandValidator : AbstractValidator<CreateProductCommand>
{
    #region Ctors

    public UpdateUserProfileCommandValidator()
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
            });

    }

    #endregion
}

public class UpdateUserProfileCommandHandler(
    IDocumentSession session,
    IMinIOCloudService minIO) : ICommandHandler<CreateProductCommand, ResultSharedResponse<string>>
{
    #region Implementations

    public async Task<ResultSharedResponse<string>> Handle(CreateProductCommand command, CancellationToken cancellationToken)
    {
        var dto = command.Dto;
        var categories = await session.Query<CategoryEntity>().ToListAsync(token: cancellationToken);
        ValidateCategory(dto.CategoryIds, categories.ToList());

        var entity = ProductEntity.Create(
            id: Guid.NewGuid(),
            name: dto.Name!,
            sku: dto.Sku!,
            slug: dto.Name!.Slugify(),
            shortDescription: dto.ShortDescription!,
            longDescription: dto.LongDescription!,
            price: dto.Price,
            salesPrice: dto.SalesPrice,
            categoryIds: dto.CategoryIds?.Distinct().ToList(),
            createdBy: command.CurrentUserId.ToString());

        await UploadImagesAsync(dto.Files, entity, cancellationToken);
        
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
        ProductEntity entity,
        CancellationToken cancellationToken)
    {
        if (filesDto != null && filesDto.Any())
        {
            var result = await minIO.UploadFilesAsync(filesDto, BucketName.Products, true, cancellationToken);
            entity.AddOrUpdateImages(result.Adapt<List<ProductImageEntity>>());
        }
    }

    private void ValidateCategory(List<Guid>? inputCategoryIds, List<CategoryEntity> categories)
    {
        if (inputCategoryIds is { Count: > 0 })
        {
            var existingIds = categories.Select(c => c.Id).ToHashSet();
            var invalidIds = inputCategoryIds.Where(id => !existingIds.Contains(id)).ToList();

            if (invalidIds.Any())
            {
                throw new BadRequestException(MessageCode.CategoryIsNotExists, string.Join(", ", invalidIds));
            }
        }
    }

    #endregion
}