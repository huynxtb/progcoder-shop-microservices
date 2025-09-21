using System.ComponentModel;

namespace Inventory.Worker.Outbox.Enums;

public enum MessageType
{
    #region Fields, Properties and Indexers

    [Description("New")]
    New = 1,
    [Description("Retry")]
    Retry = 2,

    #endregion
}
