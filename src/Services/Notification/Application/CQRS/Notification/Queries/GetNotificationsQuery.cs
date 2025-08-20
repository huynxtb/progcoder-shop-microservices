//#region using

//using BuildingBlocks.Pagination.Extensions;
//using Notification.Application.Data.Repositories;
//using Notification.Application.Models.Responses;
//using SourceCommon.Models.Reponses;

//#endregion

//namespace Notification.Application.CQRS.Notification.Queries;

//public sealed record GetNotificationsQuery(PaginationRequest Paging) : IQuery<ResultSharedResponse<GetNotificationsReponse>>;

//public sealed class GetNotificationsQueryHandler(IQueryNotificationTemplateRepository repo)
//    : IQueryHandler<GetNotificationsQuery, ResultSharedResponse<GetNotificationsReponse>>
//{
//    #region Implementations

//    public async Task<ResultSharedResponse<GetNotificationsReponse>> Handle(GetNotificationsQuery query, CancellationToken cancellationToken)
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
//            .Skip(query.Paging.ToSkip())
//            .Take(query.Paging.ToTake())
//            .AsNoTracking()
//            .ToListAsync(cancellationToken);

//        var reponse = new GetNotificationsReponse()
//        {
//            Items = result.Adapt<List<UserDto>>(),
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

//        return ResultSharedResponse<GetNotificationsReponse>
//            .Success(reponse, MessageCode.GetSuccessfully);
//    }

//    #endregion
//}