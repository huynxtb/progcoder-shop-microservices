#region using

using User.Application.Dtos.Users;
using SourceCommon.Models.Reponses;

#endregion

namespace User.Application.Models.Responses;

public sealed class GetUsersResponse
{
    #region Fields, Properties and Indexers

    public List<UserDto>? Items { get; set; }

    public PaginationResponse Paging { get; set; } = new();

    #endregion
}
