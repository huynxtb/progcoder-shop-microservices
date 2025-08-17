#region using

using User.Application.Dtos.LoginHistories;
using SourceCommon.Models.Reponses;

#endregion

namespace User.Application.Models.Responses;

public sealed class GetLoginHistoriesReponse
{
    #region Fields, Properties and Indexers

    public List<LoginHistoryDto>? Items { get; set; }

    public PagingOptionReponse Paging { get; set; } = new();

    #endregion
}
