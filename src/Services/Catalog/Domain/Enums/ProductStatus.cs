#region using

using System.ComponentModel;

#endregion

namespace Catalog.Domain.Enums;

public enum ProductStatus
{
    [Description("In Stock")]
    InStock = 1,

    [Description("Out of Stock")]
    OutOfStock = 2
}
