#region using

using User.Application.Dtos.LoginHistories;
using SourceCommon.Models.Reponses;

#endregion

namespace User.Application.Models.Responses;

public sealed class GetLoginHistoriesResponse
{
    #region Fields, Properties and Indexers

    public List<LoginHistoryDto>? Items { get; set; }

    public PaginationResponse Paging { get; set; } = new();

    #endregion
}
