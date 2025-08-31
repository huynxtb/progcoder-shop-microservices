#region using

using User.Application.Data;
using User.Application.Models.Responses;
using Microsoft.EntityFrameworkCore;
using SourceCommon.Models.Reponses;

#endregion

namespace User.Application.CQRS.User.Queries;

public sealed record GetUserByIdQuery(Guid UserId) : IQuery<ResultSharedResponse<GetUserByIdResponse>>;

public sealed class GetUserByIdQueryHandler(IApplicationDbContext dbContext)
    : IQueryHandler<GetUserByIdQuery, ResultSharedResponse<GetUserByIdResponse>>
{
    #region Implementations

    public async Task<ResultSharedResponse<GetUserByIdResponse>> Handle(GetUserByIdQuery query, CancellationToken cancellationToken)
    {
        var result = await dbContext.Users
            .AsNoTracking()
            .SingleOrDefaultAsync(x => x.Id == query.UserId, cancellationToken);

        var reponse = result.Adapt<GetUserByIdResponse>();

        return ResultSharedResponse<GetUserByIdResponse>
            .Success(reponse, MessageCode.GetSuccess);
    }

    #endregion
}