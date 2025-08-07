#region using

using Application.Data;
using Application.Dtos.AccountProfile;
using SourceCommon.Models.Reponse;
using Microsoft.EntityFrameworkCore;

#endregion

namespace Application.CQRS.AccountProfile.Queries;

public record GetAccountProfileByKeycloakUserNoQuery(Guid UserNo) : IQuery<ResultSharedResponse<AccountProfileDto>>;

public class GetAccountProfileByKeycloakUserNoQueryHandler(IReadDbContext readDbContext)
    : IQueryHandler<GetAccountProfileByKeycloakUserNoQuery, ResultSharedResponse<AccountProfileDto>>
{
    #region Implementations

    public async Task<ResultSharedResponse<AccountProfileDto>> Handle(GetAccountProfileByKeycloakUserNoQuery query, CancellationToken cancellationToken)
    {
        var entity = await readDbContext.AccountProfiles.Where(acc => acc.KeycloakUserNo == query.UserNo)
            .FirstOrDefaultAsync() ?? throw new NotFoundException(MessageCode.ResourceNotFound);

        var dto = entity.Adapt<AccountProfileDto>();

        return ResultSharedResponse<AccountProfileDto>.Success(dto, MessageCode.GetSuccessfully);
    }

    #endregion
}