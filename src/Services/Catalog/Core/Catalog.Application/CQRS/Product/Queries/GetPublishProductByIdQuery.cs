#region using

using AutoMapper;
using Catalog.Application.Dtos.Products;
using Catalog.Application.Models.Results;
using Catalog.Domain.Entities;
using Marten;

#endregion

namespace Catalog.Application.CQRS.Product.Queries;

public sealed record GetPublishProductByIdQuery(Guid ProductId) : IQuery<GetPublishProductByIdResult>;

public sealed class GetPublishProductByIdQueryHandler(IDocumentSession session, IMapper mapper)
    : IQueryHandler<GetPublishProductByIdQuery, GetPublishProductByIdResult>
{
    #region Implementations

    public async Task<GetPublishProductByIdResult> Handle(GetPublishProductByIdQuery query, CancellationToken cancellationToken)
    {
        var result = await session.Query<ProductEntity>()
            .Where(x => x.Id == query.ProductId && x.Published)
            .SingleOrDefaultAsync(cancellationToken)
            ?? throw new NotFoundException(MessageCode.ResourceNotFound, query.ProductId);

        var categories = await session.Query<CategoryEntity>()
            .ToListAsync(cancellationToken);
        var brands = await session.Query<BrandEntity>()
            .ToListAsync(cancellationToken);

        var reponse = mapper.Map<PublishProductDto>(result);

        if (result.CategoryIds != null && result.CategoryIds.Count > 0)
        {
            foreach (var categoryId in result.CategoryIds)
            {
                var category = categories.FirstOrDefault(c => c.Id == categoryId);
                if (category != null)
                {
                    reponse.CategoryNames ??= [];
                    reponse.CategoryNames.Add(category.Name!);
                }
            }
        }

        if (result.BrandId.HasValue)
        {
            var brand = brands.FirstOrDefault(b => b.Id == result.BrandId.Value);
            if (brand != null)
            {
                reponse.BrandName = brand.Name;
            }
        }

        return new GetPublishProductByIdResult(reponse);
    }

    #endregion
}