#region using

using BuildingBlocks.Abstractions.ValueObjects;
using Basket.Application.Dtos.Products;
using Basket.Application.Services;
using Basket.Domain.Entities;
using Common.Models.Reponses;
using Mapster;
using Marten;
using Microsoft.AspNetCore.Http.HttpResults;

#endregion

namespace Basket.Application.CQRS.Product.Commands;

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
            });

    }

    #endregion
}

public class CreateProductCommandHandler(
    IDocumentSession session,
    IMinIOCloudService minIO) : ICommandHandler<CreateProductCommand, Guid>
{
    #region Implementations

    public async Task<Guid> Handle(CreateProductCommand command, CancellationToken cancellationToken)
    {
        var dto = command.Dto;
        var categories = await session.Query<ShoppingCartEntity>().ToListAsync(token: cancellationToken);
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
            performedBy: command.Actor.ToString());

        await UploadImagesAsync(dto.Files, entity, cancellationToken);
        
        session.Store(entity);
        await session.SaveChangesAsync(cancellationToken);

        return entity.Id;
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
            var result = await minIO.UploadFilesAsync(filesDto, Constants.Bucket.Products, true, cancellationToken);
            entity.AddOrUpdateImages(result.Adapt<List<ShoppingCartItemEntity>>());
        }
    }

    private void ValidateCategory(List<Guid>? inputCategoryIds, List<ShoppingCartEntity> categories)
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