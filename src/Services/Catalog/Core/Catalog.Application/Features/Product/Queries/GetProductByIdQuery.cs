#region using

using AutoMapper;
using Catalog.Application.Dtos.Products;
using Catalog.Application.Models.Results;
using Catalog.Domain.Entities;
using Marten;

#endregion

namespace Catalog.Application.Features.Product.Queries;

public sealed record GetProductByIdQuery(Guid ProductId) : IQuery<GetProductByIdResult>;

public sealed class GetProductByIdQueryHandler(IDocumentSession session, IMapper mapper)
    : IQueryHandler<GetProductByIdQuery, GetProductByIdResult>
{
    #region Implementations

    public async Task<GetProductByIdResult> Handle(GetProductByIdQuery query, CancellationToken cancellationToken)
    {
        var result = await session.LoadAsync<ProductEntity>(query.ProductId) 
            ?? throw new NotFoundException(MessageCode.ResourceNotFound, query.ProductId);

        var categories = await session.Query<CategoryEntity>()
            .ToListAsync(cancellationToken);
        var brands = await session.Query<BrandEntity>()
            .ToListAsync(cancellationToken);

        var reponse = mapper.Map<ProductDto>(result);

        if (result.CategoryIds != null && result.CategoryIds.Count > 0)
        {
            foreach (var categoryId in result.CategoryIds)
            {
                var category = categories.FirstOrDefault(c => c.Id == categoryId);
                if (category != null)
                {
                    reponse.CategoryNames ??= [];
                    reponse.CategoryNames.Add(category.Name!);
                    reponse.CategoryIds ??= [];
                    reponse.CategoryIds.Add(category.Id);
                }
            }
        }

        if (result.BrandId.HasValue)
        {
            var brand = brands.FirstOrDefault(b => b.Id == result.BrandId.Value);
            if (brand != null)
            {
                reponse.BrandName = brand.Name;
                reponse.BrandId = brand.Id;
            }
        }

        return new GetProductByIdResult(reponse);
    }

    #endregion
}