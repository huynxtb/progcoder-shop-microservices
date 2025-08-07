#region using

using Application.Data;
using Application.Dtos.AccountProfile;
using SourceCommon.Models.Reponse;
using Microsoft.EntityFrameworkCore;

#endregion

namespace Application.CQRS.AccountProfile.Queries;

public record GetAccountProfileByIdQuery(long Id) : IQuery<ResultSharedResponse<AccountProfileDto>>;

public class GetAccountProfileByIdQueryHandler(IReadDbContext readDbContext)
    : IQueryHandler<GetAccountProfileByIdQuery, ResultSharedResponse<AccountProfileDto>>
{
    #region Implementations

    public async Task<ResultSharedResponse<AccountProfileDto>> Handle(GetAccountProfileByIdQuery query, CancellationToken cancellationToken)
    {
        var entity = await readDbContext.AccountProfiles.Where(acc => acc.Id == query.Id)
            .FirstOrDefaultAsync() ?? throw new NotFoundException(MessageCode.ResourceNotFound);

        //await readDbContext.AccountProfiles.Where(acc => acc.Id == query.Id).ExecuteDeleteAsync();

        var dto = entity.Adapt<AccountProfileDto>();

        return ResultSharedResponse<AccountProfileDto>.Success(dto, MessageCode.GetSuccessfully);
    }

    #endregion
}