#region using

using User.Application.Dtos.Users;
using SourceCommon.Models.Reponses;

#endregion

namespace User.Application.Models.Responses;

public sealed class GetUsersReponse
{
    #region Fields, Properties and Indexers

    public List<UserDto>? Items { get; set; }

    public PagingOptionReponse Paging { get; set; } = new();

    #endregion
}
