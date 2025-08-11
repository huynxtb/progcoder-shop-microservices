#region using

using Application.Data;
using Application.Models.Responses;
using Microsoft.EntityFrameworkCore;
using SourceCommon.Models.Reponses;

#endregion

namespace Application.CQRS.AccountProfile.Queries;

public sealed record GetUserByIdQuery(Guid UserId) : IQuery<ResultSharedResponse<GetUserByIdReponse>>;

public sealed class GetUserByIdQueryHandler(IReadDbContext dbContext)
    : IQueryHandler<GetUserByIdQuery, ResultSharedResponse<GetUserByIdReponse>>
{
    #region Implementations

    public async Task<ResultSharedResponse<GetUserByIdReponse>> Handle(GetUserByIdQuery query, CancellationToken cancellationToken)
    {
        var result = await dbContext.Users
            .SingleOrDefaultAsync(x => x.Id == query.UserId, cancellationToken);

        var reponse = result.Adapt<GetUserByIdReponse>();

        return ResultSharedResponse<GetUserByIdReponse>
            .Success(reponse, MessageCode.GetSuccessfully);
    }

    #endregion
}