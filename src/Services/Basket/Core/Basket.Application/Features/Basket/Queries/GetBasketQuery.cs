#region using

using AutoMapper;
using Basket.Application.Dtos.Baskets;
using Basket.Application.Models.Results;
using Basket.Application.Repositories;

#endregion

namespace Basket.Application.Features.Basket.Queries;

public sealed record GetBasketQuery(string UserId) : IQuery<GetBasketResult>;

public sealed class GetBasketQueryHandler(IBasketRepository repository, IMapper mapper) : IQueryHandler<GetBasketQuery, GetBasketResult>
{
    #region Implementations

    public async Task<GetBasketResult> Handle(GetBasketQuery query, CancellationToken cancellationToken)
    {
        var basket = await repository.GetBasketAsync(query.UserId, cancellationToken);

        var result = mapper.Map<ShoppingCartDto>(basket);
        var response = new GetBasketResult(result);

        return response;
    }

    #endregion
}