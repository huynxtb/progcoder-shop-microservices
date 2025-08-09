#region using

using Application.Dtos.Users;
using SourceCommon.Models.Reponses;

#endregion

namespace Application.Models.Responses;

public sealed class GetUsersReponse
{
    #region Fields, Properties and Indexers

    public List<UserDto>? Items { get; set; }

    public PagingOptionReponse Paging { get; set; } = new();

    #endregion
}
