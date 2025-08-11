#region using

using Application.Dtos.LoginHistories;
using SourceCommon.Models.Reponses;

#endregion

namespace Application.Models.Responses;

public sealed class GetLoginHistoriesReponse
{
    #region Fields, Properties and Indexers

    public List<LoginHistoryDto>? Items { get; set; }

    public PagingOptionReponse Paging { get; set; } = new();

    #endregion
}
