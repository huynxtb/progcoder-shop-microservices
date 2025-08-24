#region using

using User.Application.Data;
using User.Application.Models.Responses;
using Microsoft.EntityFrameworkCore;
using SourceCommon.Models.Reponses;

#endregion

namespace User.Application.CQRS.User.Queries;

public sealed record GetUserByIdQuery(Guid UserId) : IQuery<ResultSharedResponse<GetUserByIdReponse>>;

public sealed class GetUserByIdQueryHandler(IApplicationDbContext dbContext)
    : IQueryHandler<GetUserByIdQuery, ResultSharedResponse<GetUserByIdReponse>>
{
    #region Implementations

    public async Task<ResultSharedResponse<GetUserByIdReponse>> Handle(GetUserByIdQuery query, CancellationToken cancellationToken)
    {
        var result = await dbContext.Users
            .AsNoTracking()
            .SingleOrDefaultAsync(x => x.KeycloakUserNo == query.UserId.ToString(), cancellationToken);

        var reponse = result.Adapt<GetUserByIdReponse>();

        return ResultSharedResponse<GetUserByIdReponse>
            .Success(reponse, MessageCode.GetSuccess);
    }

    #endregion
}