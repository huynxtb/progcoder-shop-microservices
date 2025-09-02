#region using

using System.ComponentModel;

#endregion

namespace Common.Enums;

public enum ApplicationStatus
{
    #region Fields, Properties and Indexers

    [Description("Draf")]
    Draft = 1,

    [Description("Awaiting Approval")]
    AwaitingApproval = 2,

    [Description("Approved")]
    Approved = 3,

    [Description("Rejected")]
    Rejected = 4,

    [Description("Expired")]
    Expired = 6,

    [Description("Active")]
    Active = 7,

    [Description("Inactive")]
    Inactive = 8,

    #endregion

}
