//#region using

//using Catalog.Application.Data;
//using Catalog.Application.Dtos.Users;
//using Catalog.Application.Models.Responses;
//using BuildingBlocks.Pagination.Extensions;
//using Microsoft.EntityFrameworkCore;
//using SourceCommon.Models.Reponses;

//#endregion

//namespace Catalog.Application.CQRS.User.Queries;

//public record class GetUsersFilter(string? SearchText);

//public sealed record GetUsersQuery(
//    GetUsersFilter Filter,
//    PaginationRequest Paging) : IQuery<ResultSharedResponse<GetProductsReponse>>;

//public sealed class GetUsersQueryHandler(IApplicationDbContext dbContext)
//    : IQueryHandler<GetUsersQuery, ResultSharedResponse<GetProductsReponse>>
//{
//    #region Implementations

//    public async Task<ResultSharedResponse<GetProductsReponse>> Handle(GetUsersQuery query, CancellationToken cancellationToken)
//    {
//        var total = await dbContext.Users
//            .AsNoTracking()
//            .CountAsync(cancellationToken);

//        var totalPages = (int)Math.Ceiling(total / (double)query.Paging.PageSize);

//        var result = await dbContext.Users
//            .Where(
//                x => string.IsNullOrEmpty(query.Filter.SearchText) || 
//                x.UserName!.Contains(query.Filter.SearchText) ||
//                x.FirstName!.Contains(query.Filter.SearchText) ||
//                x.LastName!.Contains(query.Filter.SearchText))
//            .OrderByDescending(x => x.CreatedOnUtc)
//            .WithPaging(query.Paging)
//            .AsNoTracking()
//            .ToListAsync(cancellationToken);

//        var reponse = new GetProductsReponse()
//        {
//            Items = result.Adapt<List<ProductDto>>(),
//            Paging = new()
//            {
//                Total = total,
//                PageNumber = query.Paging.PageNumber,
//                PageSize = query.Paging.PageSize,
//                HasItem = result.Any(),
//                TotalPages = totalPages,
//                HasNextPage = query.Paging.PageNumber < totalPages,
//                HasPreviousPage = query.Paging.PageNumber > 1
//            }
//        };

//        return ResultSharedResponse<GetProductsReponse>
//            .Success(reponse, MessageCode.GetSuccess);
//    }

//    #endregion
//}